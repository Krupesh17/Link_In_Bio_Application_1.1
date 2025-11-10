import { GoogleGenAI, Type } from "@google/genai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// For Enhancing Bio.
const BIO_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    suggestions: {
      type: Type.ARRAY,
      description: "An array of 4 enhanced bios, one for each tone.",
      items: {
        type: Type.OBJECT,
        properties: {
          suggestion: {
            type: Type.STRING,
            description: "An enhanced bio, 80 characters or less.",
          },
          tone: {
            type: Type.STRING,
            description:
              "The tone of the suggestion. One of: Professional, Casual, Witty, Inspirational.",
          },
        },
        required: ["suggestion", "tone"],
      },
    },
  },
  required: ["suggestions"],
};

export const enhanceBio = async (bio) => {
  try {
    const prompt = `
      You are an expert copywriter specializing in social media profiles for platforms like Linktree.
      Your task is to take a user's draft bio and enhance it to be more engaging, professional, and concise.
      
      Instructions:
      1. Generate exactly 4 alternative bios.
      2. Provide one bio for each of the following tones: 'Professional', 'Casual', 'Witty', 'Inspirational'.
      3. Each bio MUST be a maximum of 80 characters long. This is a strict requirement.
      4. Focus on clarity, impact, and a strong call-to-action if appropriate.

      User's draft bio: "${bio}"

      Return the 4 suggestions in the specified JSON format, with each object containing the suggestion and its corresponding tone.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: BIO_SCHEMA,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    if (
      parsedResponse.suggestions &&
      Array.isArray(parsedResponse.suggestions)
    ) {
      // Double-check the length constraint on the client-side as a fallback
      return parsedResponse.suggestions.map((s) => ({
        ...s,
        suggestion: s.suggestion.slice(0, 80),
      }));
    } else {
      throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    console.error("Error enhancing bio:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to get suggestions from AI: ${error.message}`);
    }
    throw new Error(
      "An unknown error occurred while communicating with the AI."
    );
  }
};

// For Smart Cropping Profile Pictures Using AI
const PERSON_DETECTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    person_count: {
      type: Type.INTEGER,
      description: "Total number of people detected in the image.",
    },
    bounding_box: {
      type: Type.OBJECT,
      description:
        "Bounding box of the most prominent person. This will be null if no person is found.",
      nullable: true,
      properties: {
        x: {
          type: Type.NUMBER,
          description: "Normalized top-left x-coordinate (from 0 to 1).",
        },
        y: {
          type: Type.NUMBER,
          description: "Normalized top-left y-coordinate (from 0 to 1).",
        },
        width: {
          type: Type.NUMBER,
          description: "Normalized width of the box (from 0 to 1).",
        },
        height: {
          type: Type.NUMBER,
          description: "Normalized height of the box (from 0 to 1).",
        },
      },
      required: ["x", "y", "width", "height"],
    },
  },
  required: ["person_count", "bounding_box"],
};

function dataUrlToInlineData(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const mimeType = header.match(/:(.*?);/)?.[1];
  if (!mimeType || !data) {
    throw new Error("Invalid data URL format");
  }
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
}

export async function cropToPerson(base64Image) {
  const imagePart = dataUrlToInlineData(base64Image);

  const prompt = `Analyze the image to detect people. Your response must be a JSON object that strictly adheres to the provided schema.
- IMPORTANT: When calculating the bounding_box for a single person, you must ensure the box's top boundary (y-coordinate) is positioned high enough to include the **person's entire head, hair, and a small margin above the head**. The resulting bounding box should capture the person centered in the frame, prioritizing the upper body for a profile picture.
- If one person is found, set person_count to 1 and provide their bounding_box.
- If multiple people are found, set person_count to the number of people found, and set bounding_box to null.
- If no people are found, set person_count to 0 and set bounding_box to null.
The bounding box coordinates must be normalized from 0 to 1.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [imagePart, { text: prompt }],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: PERSON_DETECTION_SCHEMA,
    },
  });

  const jsonText = response.text.trim();
  let result;

  try {
    result = JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse Gemini response:", jsonText);
    throw new Error("The AI returned an invalid response. Please try again.");
  }

  if (result.person_count > 1) {
    throw new Error(
      "Multiple people detected. Please upload a photo with only one person."
    );
  }

  if (result.person_count === 0 || !result.bounding_box) {
    throw new Error(
      "No person was found in the photo. Please try another one."
    );
  }

  return result.bounding_box;
}

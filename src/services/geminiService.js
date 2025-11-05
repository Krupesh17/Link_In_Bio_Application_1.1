import { GoogleGenAI, Type } from "@google/genai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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
            description: "An enhanced bio, 80 characters or less."
          },
          tone: {
            type: Type.STRING,
            description: "The tone of the suggestion. One of: Professional, Casual, Witty, Inspirational."
          }
        },
        required: ['suggestion', 'tone']
      }
    }
  },
  required: ['suggestions']
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

    if (parsedResponse.suggestions && Array.isArray(parsedResponse.suggestions)) {
        // Double-check the length constraint on the client-side as a fallback
        return parsedResponse.suggestions.map(s => ({
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
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};

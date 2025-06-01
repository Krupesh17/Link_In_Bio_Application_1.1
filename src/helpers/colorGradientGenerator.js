/**
 * Converts a hexadecimal color string to an RGB object.
 * @param {string} hex - The hexadecimal color string (e.g., "#RRGGBB" or "RRGGBB").
 * @returns {{r: number, g: number, b: number} | null} An object with r, g, b properties (0-255), or null if invalid hex.
 */
const hexToRgb = (hex) => {
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * Converts an RGB object to a hexadecimal color string.
 * @param {{r: number, g: number, b: number}} rgb - An object with r, g, b properties (0-255).
 * @returns {string} The hexadecimal color string (e.g., "#RRGGBB").
 */
const rgbToHex = (rgb) => {
  const toHex = (c) => {
    const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16); // Ensure values are within 0-255
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Object          The HSL representation {h, s, l}
 */
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break; // Should not happen
    }
    h /= 6;
  }
  return { h: h * 360, s, l }; // h in degrees (0-360), s and l in [0, 1]
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Object          The RGB representation {r, g, b}
 */
const hslToRgb = (h, s, l) => {
  let r, g, b;

  h /= 360; // Normalize h to [0, 1]

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
};

/**
 * Generates a Tailwind CSS class string for a vertical gradient
 * from the given HEX color to a "previous" color in the spectrum,
 * achieved by shifting the hue.
 *
 * @param {string} hexColor - The starting HEX color code (e.g., "#FF0000" or "FF0000").
 * @param {number} hueShiftDegrees - The amount to shift the hue (e.g., 30 for a subtle shift).
 * @returns {{tailwindClass: string, fromHex: string, toHex: string} | null} An object containing the Tailwind CSS class string
 * and the 'from' and 'to' HEX colors, or null if the input hex color is invalid.
 */
const generateSpectrumGradient = (hexColor, hueShiftDegrees = 30) => {
  const originalRgb = hexToRgb(hexColor);
  if (!originalRgb) {
    return null; // Invalid hex color
  }

  const { h, s, l } = rgbToHsl(originalRgb.r, originalRgb.g, originalRgb.b);

  // Shift hue to get the "previous" color in the spectrum
  let newHue = h - hueShiftDegrees;
  // Ensure hue wraps around correctly (0-360)
  if (newHue < 0) {
    newHue += 360;
  }

  const spectrumRgb = hslToRgb(newHue, s, l);
  const spectrumHex = rgbToHex(spectrumRgb);

  // Ensure the original hex color starts with '#' for Tailwind's arbitrary values
  const formattedOriginalHex = hexColor.startsWith("#")
    ? hexColor
    : `#${hexColor}`;

  return {
    linear_gradient: `linear-gradient(180deg,${formattedOriginalHex} 0%, ${spectrumHex} 100%)`,
    fromHex: formattedOriginalHex,
    toHex: spectrumHex,
  };
};

export { generateSpectrumGradient };

export function lightenColor(hex, percent) {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, r + ((255 - r) * percent) / 100);
  g = Math.min(255, g + ((255 - g) * percent) / 100);
  b = Math.min(255, b + ((255 - b) * percent) / 100);

  const toHex = (c) => Math.round(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function generatePolkaDotSVG(foregroundFillColorHex) {
  return new Promise((resolve, reject) => {
    try {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(foregroundFillColorHex)) {
        throw new Error(
          "Invalid HEX color code provided for circle fill. Please use a format like #RRGGBB or #RGB."
        );
      }

      const backgroundFillColorHex = lightenColor(foregroundFillColorHex, 40);

      const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="270" height="405" viewBox="0 0 270 405">
      <defs>
        <pattern id="polka-circle" width="54" height="54" patternUnits="userSpaceOnUse">
          <circle cx="27" cy="33.75" r="15" fill="${foregroundFillColorHex}">
            <animate attributeName="r" calcMode="spline" dur="2s" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" keyTimes="0; 0.5; 1" repeatCount="indefinite" values="15;20;15"/>
          </circle>
        </pattern>
        <rect id="polka-brick" width="54" height="67.5" x="0" y="0" fill="url(#polka-circle)"/>
        <use id="polka-row-o" x="-25" y="0" href="#polka-row"/>
        <g id="polka-row">
          <use href="#polka-brick"/>
          <use x="54" href="#polka-brick"/>
          <use x="108" href="#polka-brick"/>
          <use x="162" href="#polka-brick"/>
          <use x="216" href="#polka-brick"/>
          <use x="266" href="#polka-brick"/>
        </g>
      </defs>
      <rect width="100%" height="100%" fill="${backgroundFillColorHex}"/>
      <g transform="translate(0 -33.75)">
        <use href="#polka-row-o"/>
        <use y="67.5" href="#polka-row"/>
        <use y="135" href="#polka-row-o"/>
        <use y="202.5" href="#polka-row"/>
        <use y="270" href="#polka-row-o"/>
        <use y="337.5" href="#polka-row"/>
        <use y="405" href="#polka-row-o"/>
      </g>
    </svg>
  `;

      resolve(`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`);
    } catch (error) {
      reject(error);
    }
  });
}

export function generateStripsSVG(foregroundFillColorHex) {
  return new Promise((resolve, reject) => {
    try {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(foregroundFillColorHex)) {
        throw new Error(
          "Invalid HEX color code provided for circle fill. Please use a format like #RRGGBB or #RGB."
        );
      }

      const backgroundFillColorHex = lightenColor(foregroundFillColorHex, 40);

      const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" viewBox="0 0 270 270">
      <defs>
          <pattern id="selector-stripe-bg" width="77" height="77"
              patternTransform="rotate(90)scale(.7)" patternUnits="userSpaceOnUse">
              <g transform="scale(.3)">
                  <defs>
                      <g id="selector-stripe-stripe">
                          <path fill="${foregroundFillColorHex}" d="M256-128h128l-512 512V256Z" />
                          <path fill="${foregroundFillColorHex}" d="M384 0v128L128 384H0Z" />
                      </g>
                  </defs>
                  <g>
                      <use x="-256" href="#selector-stripe-stripe" />
                      <use href="#selector-stripe-stripe" />
                      <animateTransform attributeName="transform" dur="2s" keyTimes="0;1"
                          repeatCount="indefinite" type="translate" values="0 0; 256 0" />
                  </g>
              </g>
          </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${backgroundFillColorHex}" />
      <rect width="100%" height="100%" fill="url(#selector-stripe-bg)" />
    </svg>`;

      resolve(`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`);
    } catch (error) {
      reject(error);
    }
  });
}

export function generateZigZagSVG(foregroundFillColorHex) {
  return new Promise((resolve, reject) => {
    try {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(foregroundFillColorHex)) {
        throw new Error(
          "Invalid HEX color code provided for circle fill. Please use a format like #RRGGBB or #RGB."
        );
      }

      const backgroundFillColorHex = lightenColor(foregroundFillColorHex, 40);

      const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
    <defs>
        <pattern id="selector-zigzag-bg" width="20" height="20" patternTransform="scale(2.5)"
            patternUnits="userSpaceOnUse">
            <g id="selector-zigzag-animated-group">
                <g>
                    <use href="#selector-zigzag-path" />
                    <animateTransform attributeName="transform" dur="1.5s" keyTimes="0;1"
                        repeatCount="indefinite" type="translate" values="0 0; 0 20" />
                </g>
            </g>
            <g id="selector-zigzag-animated-group" transform="translate(0 -20)">
                <g>
                    <use href="#selector-zigzag-path" />
                    <animateTransform attributeName="transform" dur="1.5s" keyTimes="0;1"
                        repeatCount="indefinite" type="translate" values="0 0; 0 20" />
                </g>
            </g>
        </pattern>
        <path id="selector-zigzag-path" fill="none" stroke="${foregroundFillColorHex}" stroke-linecap="square"
            stroke-width="7" d="M-5 5 5.1 15 15 5l10 10" />
    </defs>
    <rect width="100%" height="100%" fill="${backgroundFillColorHex}" />
    <rect width="100%" height="100%" fill="url(#selector-zigzag-bg)" />
  </svg>`;

      resolve(`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`);
    } catch (error) {
      reject(error);
    }
  });
}

// color design tokens export
export const colorTokens = {
    green: {
      50: "#E6FFED",
      100: "#C1FFD1",
      200: "#92FFAC",
      300: "#63FF87",
      400: "#34FF61",
      500: "#00FF2C",
      600: "#00CC23",
      700: "#00991A",
      800: "#006611",
      900: "#003308",
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        primary: {
          dark: colorTokens.green[700],
          main: colorTokens.green[500],
          light: colorTokens.green[200],
        },
        neutral: {
          dark: colorTokens.grey[700],
          main: colorTokens.grey[500],
          mediumMain: colorTokens.grey[400],
          medium: colorTokens.grey[300],
          light: colorTokens.grey[50],
        },
        background: {
          default: colorTokens.grey[10],
          alt: colorTokens.grey[0],
        },
      },
      typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  
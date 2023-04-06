// color design tokens export
export const tokensDark = {
    grey: {
        0: "#f3f6fd", // manually adjusted
        10: "#f6f6f6",
        20: "#ffffff", // manually adjusted
        50: "#f0f0f0", // manually adjusted
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
        1000: "#000000", // manually adjusted
    },
    black: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },
    // primary: {
    //     // blue
    //     100: "#d3d4de",
    //     200: "#a6a9be",
    //     300: "#7a7f9d",
    //     400: "#4d547d",
    //     500: "#21295c",
    //     600: "#191F45", // manually adjusted
    //     700: "#141937",
    //     800: "#0d1025",
    //     900: "#070812",
    // },
    primary2: {
        100: "#282C34",
        200: "#20232A",
        300: "#1A1C22",
        400: "#15161B",
        500: "#111216",
        600: "#0E0E12",
        700: "#0B0B0E",
        800: "#09090B",
        900: "#070709",
    },

    primary: {
        100: "#0F172A",
        200: "#0C1222",
        300: "#0A0E1B",
        400: "#080B16",
        500: "#060912",
        600: "#05070E",
        700: "#04060B",
        800: "#030509",
        900: "#020407",
    },
    // secondary: {
    //     // yellow
    //     50: "#f0f0f0", // manually adjusted
    //     100: "#fff6e0",
    //     200: "#ffedc2",
    //     300: "#ffe3a3",
    //     400: "#ffda85",
    //     500: "#ffd166",
    //     600: "#cca752",
    //     700: "#997d3d",
    //     800: "#665429",
    //     900: "#332a14",
    // },
    secondary: {
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#cccccc",
        700: "#999999",
        800: "#666666",
        900: "#333333"
    },
    ternary: {
        // Blue
        100: "#2962ff",
        200: "#2458e5",
        300: "#204ecc",
        400: "#1c44b2",
        500: "#183a99",
        600: "#14317f",
        700: "#102766",
        800: "#0c1d4c",
        900: "#081333"
    },
    custom: {
        100: "#ffffff",
        200: "#e5e5e5",
        300: "#cccccc",
        400: "#b2b2b2",
        500: "#999999",
        600: "#7f7f7f",
        700: "#666666",
        800: "#181722",
        900: "#1c1b27",
        1000: "#1f1e2c",
        1500: "#232231",
    }

};

// function that reverses the color palette
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        ...tokensDark.primary,
                        main: tokensDark.primary[400],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[300],
                    },
                    neutral: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.primary[500],
                        alt: tokensDark.primary[200],
                    },
                    ternary: {
                        ...tokensDark.ternary,
                    },
                    custom: {
                        ...tokensLight.custom,
                    }
                }
                : {
                    // palette values for light mode
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.grey[50],
                        light: tokensDark.grey[100],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    neutral: {
                        ...tokensLight.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.grey[0],
                        alt: tokensDark.grey[20],
                    },
                    ternary: {
                        ...tokensDark.ternary,
                    },
                    custom: {
                        ...tokensDark.custom,
                    }
                }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
        zIndex: { tooltip: 99999 }
    };
};
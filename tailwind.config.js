const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1020px",
        },
        extend: {
            colors: {
                grayishBlack: "#1F1F1F",
                softWhite: "#dcdde1",
            },
            backgroundColor: {
                "protoss-pylon": "#00a8ff",
                "paradise-green": "#b8e994",
                "fusion-red": "#fc5c65",
            },
        },
        fontFamily: {
            sans: ["Ubuntu Mono", "sans-serif"],
            "noto-sans": ["Noto Sans Korean", "sans-serif"],
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
    darkMode: "class",
};

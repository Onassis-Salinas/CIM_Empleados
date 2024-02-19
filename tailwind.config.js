import daisyui from "daisyui"

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,svelte}', './index.html'],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    darkTheme: false,

    daisyui: {
        themes: ["light", "dark", "business", "corporate"],
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};

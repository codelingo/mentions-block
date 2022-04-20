module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      headings: `'Source Sans Pro', sans-serif`,
      sans: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";`,
      monospace: `Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;`,
    },
    namedGroups: ["b", "c", "d", "e"], // in addition to the unnamed group "group"
    listStyleType: {
      none: "none",
      disc: "disc",
      square: "square",
      decimal: "decimal",
    },
    extend: {
      colors: {
        background: "#282c34",
        skyblue: "#6cb1ff",
        codebackground: "#1E1E1E",
        brandpurple: "#8F48FF",
      },
      boxShadow: {
        brandpurple: "0 0 0.5rem 0 rgb(143, 72, 255, 0.68)",
      },
      textShadow: {
        brandpurple: "0 0 0.5rem 0 rgb(143, 72, 255, 0.68)",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            backgroundColor: "transparent",
            boxShadow: "0px 0px 0px transparent",
            borderRadius: ".25em",
          },
          "50%": {
            backgroundColor: "rgba(255, 220, 0, 40%)",
            boxShadow: "0px 0px 30px rgba(255, 220, 0, 60^)",
            borderRadius: ".25em",
          },
        },
      },
      animation: {
        glow: "glow 1s ease-in-out infinite",
      },
      /* we use 22 because we need a size that is 10 + 12 units */
      height: {
        22: "5.5rem",
      },
      padding: {
        22: "5.5rem",
      },
      inset: {
        22: "5.5rem",
        "-88": "-22rem",
        88: "22rem",
      },
      width: {
        "-88": "-22rem",
        88: "22rem",
      },
      margin: {
        "-120": "-60rem"
      }
    },
    cursor: {
      default: "default",
      pointer: "pointer",
      text: "text",
      grab: "grab",
      grabbing: "grabbing",
      "not-allowed": "not-allowed",
    },
  },
  variants: {
    display: ["responsive", "group-hover"],
    scale: ["responsive", "group-hover", "hover"],
    opacity: ["responsive", "group-hover", "hover"],
    border: ["responsive", "group-hover", "hover"],
    borderWidth: ["responsive", "group-hover", "hover"],
    backgroundColor: ["responsive", "group-hover", "hover", "active"],
    extend: {
      zIndex: ["hover"],
      flex: ["hover"],
      flexDirection: ["hover"],
      margin: ["hover"]
    }
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
        },
        "ion-cyan": "var(--ion-cyan)",
        "nebula-violet": "var(--nebula-violet)",
        ember: "var(--ember)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
        },
        stroke: "var(--stroke)",
        glass: "var(--glass)",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "Fira Code", "SF Mono", "monospace"],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}

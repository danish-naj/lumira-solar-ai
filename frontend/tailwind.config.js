/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#1b1b1b",
        "secondary": "#5f5e5e",
        "on-secondary": "#ffffff",
        "background": "#f9f9f9",
        "on-background": "#1a1c1c",
        "surface": "#f9f9f9",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f4",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "border-subtle": "#E5E5E5",
        "border-strong": "#000000",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "nominal": "#027a48",
        "nominal-bg": "#ecfdf3",
        "warning-amber": "#b54708",
        "warning-bg": "#fffaeb",
        "telemetry-blue": "#026aa2",
        "telemetry-bg": "#f0f9ff",
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "mono-data": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-caps": ["11px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "700" }],
        "mono-data": ["13px", { lineHeight: "1.4", fontWeight: "500" }],
      }
    },
  },
  plugins: [],
}

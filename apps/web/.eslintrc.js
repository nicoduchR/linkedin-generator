module.exports = {
  root: true,
  extends: ["custom", "next/core-web-vitals"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};

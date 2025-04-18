module.exports = {
  extends: [
    "next",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@next/next/no-html-link-for-pages": "off",
  },
  ignorePatterns: ["**/*.js", "**/*.json", "node_modules", "public", "dist"],
}; 
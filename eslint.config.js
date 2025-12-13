import antfu from "@antfu/eslint-config";

export default antfu({
  "formatters": true,
  "react": true,
  "stylistic": {
    quotes: "double",
    semi: true,
    trailingComma: "never",
  },
  "antfu/no-top-level-await": "off",
});

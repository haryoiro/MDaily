module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    "cypress/globals": true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "jest",
    "cypress",
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      },
    ],
    "no-console": 0,
    "no-restricted-syntax": [
      "error",
      "ForOfStatement[await=true]",
    ],
  },
}

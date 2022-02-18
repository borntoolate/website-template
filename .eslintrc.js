// https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats
// https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
// https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options
module.exports = {
  "root": true,
  "env": {
    // "es6": true,
    // "es2017": true,
    "es2020": true,
    // "es2021": true,
    "node": true,
    "browser": true,
  },
  // https://www.npmjs.com/package/@typescript-eslint/parser
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2020,
    "tsconfigRootDir": __dirname,
    "project": [
      "./tsconfig.eslint.json"
    ]
  },
  "plugins": [
    "@typescript-eslint",
    "eslint-comments",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "rules": {
    "eslint-comments/disable-enable-pair": "error",
    "eslint-comments/no-duplicate-disable": "error",
    "eslint-comments/no-unlimited-disable": "error",
    "eslint-comments/no-unused-disable": "error",
    "eslint-comments/no-unused-enable": "error",
    "eslint-comments/no-use": "off"
  },
};

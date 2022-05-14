module.exports = {
    root: true,
    plugins: [
      '@typescript-eslint',
      "react",
      "jest"
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module', 
      allowImportExportEverywhere: true,
      codeFrame: false,
      ecmaFeatures: {
        jsx: true 
      }
    },
    env: {
      "browser": true,
      "jasmine": true,
      "jest": true,
      "es6": true
    },
    rules: {
      "indent": ["error", 2],
      "semi": "off",
      "no-debugger": "error",
      "no-console": "warn",
      "no-alert": "error",
      "brace-style": ["error", "1tbs"],
      "quotes": [
        "error",
        "single"
      ],
      "jsx-quotes": [
        "error",
        "prefer-single"
      ],
      "no-invalid-position-at-import-rule": 0,
      "font-family-no-missing-generic-family-keyword": 0,
      "promise/catch-or-return": 0,
      "promise/always-return": 0,
      "promise/no-callback-in-promise": 0,
      "react/no-children-prop": 0,
      "react/jsx-filename-extension": [
        "warn",
        {
          "extensions": [
            ".tsx"
          ]
        }
      ],
      "react/forbid-component-props": 0,
      "react/jsx-max-depth": 0,
      "react/jsx-no-literals": 0,
      "react/jsx-no-bind": [
        "error",
        {
          "ignoreDOMComponents": true,
          "allowFunctions": false,
          "allowArrowFunctions": true
        }
      ],
      "react/display-name": 0,
      "react/function-component-definition": 0,
      "react/prop-types": [
        "error",
        {
          "ignore": [
            "children"
          ]
        }
      ],
      "react/destructuring-assignment": [
        "error",
        "never"
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-sort-props": 1,
      "react/jsx-sort-default-props": 1,
      "react/jsx-props-no-spreading": 0,
      "react/jsx-no-useless-fragment": 1,
      "react/jsx-one-expression-per-line": "off",
      "react/require-default-props": 0,
      "react/button-has-type": 1,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/semi": "error",
      "@typescript-eslint/no-empty-interface": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };
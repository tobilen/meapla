const introspectionSchema = require("./introspection.json");

const a11yLabelComponents = ["Label", "InputLabel"];
const a11yControlComponents = [
  "Input",
  "DigitInput",
  "Dropdown",
  "TimezoneDropdown",
  "RadioButton",
  "Checkbox",
  "TimePicker",
  "DatePicker",
];

module.exports = {
  root: true,
  extends: [
    "airbnb",
    "prettier",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
  ],
  plugins: [
    "prettier",
    "jest",
    "jest-dom",
    "react-hooks",
    "import",
    "styled-components-a11y",
    "graphql",
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  globals: {
    ga: true,
  },
  reportUnusedDisableDirectives: true,
  rules: {
    "graphql/template-strings": [
      "error",
      {
        // Import default settings for your GraphQL client. Supported values:
        // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
        env: "apollo",

        // Import your schema JSON here
        schemaJson: introspectionSchema,

        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

        // OR provide the schema in the Schema Language format
        // schemaString: printSchema(schema),

        // tagName is gql by default
      },
    ],
    "no-restricted-syntax": [
      "error",
      { selector: "TSEnumDeclaration", message: "Don't declare enums" },
    ],
    quotes: ["error", "double", { avoidEscape: true }],
    "prettier/prettier": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-undef-init": "warn",
    "arrow-body-style": "error",
    "import/no-unresolved": "off",
    "no-use-before-define": ["error"],
    "react/react-in-jsx-scope": "off",

    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx"],
      },
    ],
    "react/jsx-uses-react": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["hrefLeft", "hrefRight", "to"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: a11yLabelComponents,
        controlComponents: a11yControlComponents,
        depth: 3,
        assert: "either",
      },
    ],
    "styled-components-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: a11yLabelComponents,
        controlComponents: a11yControlComponents,
        depth: 3,
        assert: "either",
      },
    ],
    "react/destructuring-assignment": [
      "error",
      "always",
      { ignoreClassFields: true },
    ],
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "never",
      },
    ],
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      files: ["*test.*"],
      rules: {
        "require-await": "error",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
      },
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "no-use-before-define": "off",
        "jest/valid-expect": "off",
        "jest/no-disabled-tests": "error",
        "jest-dom/prefer-checked": "off",
        "jest-dom/prefer-enabled-disabled": "off",
        "react/jsx-filename-extension": "off",
        "react/default-props-match-prop-types": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: true },
        ],
        indent: "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "after-used",
            ignoreRestSiblings: true,
            argsIgnorePattern: "^_",
          },
        ],

        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/prefer-as-const": "error",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-extraneous-dependencies": "off",
        "import/export": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
      },
    },
  ],
};

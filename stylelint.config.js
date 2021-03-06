module.exports = {
  processors: ["stylelint-processor-styled-components"],
  syntax: "scss",
  extends: [
    "stylelint-config-styled-components",
    "stylelint-config-standard",
    "stylelint-config-prettier",
  ],
  rules: {
    "declaration-no-important": true,
    "at-rule-no-unknown": null,
    "no-empty-source": null,
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["/-styled-mixin/", "$dummyValue"],
      },
    ],
    "property-no-unknown": [
      true,
      { checkPrefixed: true, ignoreProperties: ["/-styled-mixin/"] },
    ],
  },
};

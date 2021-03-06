const defaultConfig = {
  presets: ["next/babel"],
  plugins: [],
};

module.exports = ({ env }) => {
  if (env("test")) {
    return {
      ...defaultConfig,
      presets: [...defaultConfig.presets],
      plugins: [
        ...defaultConfig.plugins,
        [
          "babel-plugin-styled-components",
          { ssr: false, displayName: false, namespace: "sc" },
        ],
      ],
    };
  }

  return {
    ...defaultConfig,
    presets: [...defaultConfig.presets],
    plugins: [
      ...defaultConfig.plugins,
      ["babel-plugin-styled-components", { ssr: true, namespace: "sc" }],
      "babel-plugin-jsx-remove-data-test-id",
    ],
  };
};

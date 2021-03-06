module.exports = {
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  typescript: {
    reactDocgen: false,
  },
  stories: ["../**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        control: false,
      },
    },
  ],
};

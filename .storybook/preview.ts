import { withNextRouter } from "storybook-addon-next-router";
import { StyleDecorator } from "./StyleDecorator";
import { ApolloDecorator } from "./ApolloDecorator";
import { GrommetDecorator } from "./GrommetDecorator";

export const decorators = [
  StyleDecorator,
  ApolloDecorator([]),
  GrommetDecorator,
  withNextRouter(),
];

export const parameters = {
  backgrounds: {
    default: "white",
    values: [
      { name: "white", value: "#fff" },
      { name: "dark", value: "#000" },
    ],
  },
};

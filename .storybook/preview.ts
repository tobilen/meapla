import { StyleDecorator } from "./StyleDecorator";
import { ApolloDecorator } from "./ApolloDecorator";

export const decorators = [StyleDecorator, ApolloDecorator];

export const parameters = {
  backgrounds: {
    default: "white",
    values: [
      { name: "white", value: "#fff" },
      { name: "dark", value: "#000" },
    ],
  },
};

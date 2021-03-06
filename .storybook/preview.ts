import { StyleDecorator } from "./StyleDecorator";

export const decorators = [StyleDecorator];

export const parameters = {
  backgrounds: {
    default: "injixo",
    values: [
      { name: "white", value: "#fff" },
      { name: "dark", value: "#000" },
    ],
  },
};

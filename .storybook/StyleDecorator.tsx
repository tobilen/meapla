import { createGlobalStyle } from "styled-components";
import { DecoratorFn } from "@storybook/react";
import "normalize.css";

const StoryStyles = createGlobalStyle`
  body {
    background: transparent;
    padding: 50px;
  }
`;

export const StyleDecorator: DecoratorFn = (story) => (
  <>
    <StoryStyles />
    {story()}
  </>
);

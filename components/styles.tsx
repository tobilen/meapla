import NextLink from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { Anchor } from "grommet";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const Spacer = styled.div`
  height: 1rem;
  width: 1rem;
`;

export const Link: typeof Anchor = ({ href, ...props }) => (
  <NextLink href={href || ""} passHref>
    <Anchor {...props} />
  </NextLink>
);

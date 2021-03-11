import styled from "styled-components";
import NextLink from "next/link";
import { Anchor } from "grommet";

export const Spacer = styled.div`
  height: 1rem;
  width: 1rem;
`;

export const Link: typeof Anchor = ({ href, ...props }) => (
  <NextLink href={href || ""} passHref>
    <Anchor {...props} />
  </NextLink>
);

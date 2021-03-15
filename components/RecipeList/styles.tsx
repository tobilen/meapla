import * as React from "react";
import styled, { StyledComponentProps } from "styled-components";
import * as Icons from "grommet-icons";
import { normalizeColor } from "grommet/utils";
import { Button, ThemeContext } from "grommet";

export type Props = StyledComponentProps<
  typeof Button,
  never,
  JSX.IntrinsicElements["svg"] & { hoverColor: string },
  ""
>;

const ButtonWithHoverColor = styled(Button)<Props>`
  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`;

export const AdminButton: React.FC<Props> = ({ hoverColor, ...props }) => {
  const theme = React.useContext(ThemeContext);
  const brandColor = normalizeColor(hoverColor, theme);

  return <ButtonWithHoverColor {...props} hoverColor={brandColor} />;
};

export const EditIcon = styled(Icons.Edit)`
  stroke: currentColor;
`;

export const TrashIcon = styled(Icons.Trash)`
  stroke: currentColor;
`;

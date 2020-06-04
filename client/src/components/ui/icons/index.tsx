import styled from "styled-components";
import { ReactComponent as Play } from "./play.svg";
import { ReactComponent as Plus } from "./plus.svg";

export const PlayIcon = styled(Play)`
  width: 100%;
  height: 100%;
  padding: 2px;
  fill: ${props => props.theme.color.primary};
`;

export const PlusIcon = styled(Plus)`
  width: 100%;
  height: 100%;
  padding: 3px;
  fill: ${props => props.theme.color.primary};
`;

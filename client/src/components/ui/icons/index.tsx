import styled from "styled-components";
import { ReactComponent as Beer } from "./beer.svg";
import { ReactComponent as Plus } from "./plus.svg";
import { ReactComponent as Leave } from "./leave.svg";

export const BeerIcon = styled(Beer)`
  width: 100%;
  height: 100%;
  fill: ${props => props.theme.color.primary};
  padding: 2px;
`;

export const PlusIcon = styled(Plus)`
  width: 100%;
  height: 100%;
  padding: 3px;
  fill: ${props => props.theme.color.primary};
`;

export const LeaveIcon = styled(Leave)`
  width: 100%;
  height: 100%;
  color: ${props => props.theme.color.primary};
`;

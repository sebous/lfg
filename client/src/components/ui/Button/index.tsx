import styled from "styled-components";

export const Btn = styled.button`
  min-width: 4.5rem;
  height: 2.25rem;
  background: transparent;
  padding: 0 0.5rem;
  color: ${props => props.theme.color.primary};
  border: 1px solid ${props => props.theme.color.primary};
  border-radius: 2px;
  text-transform: uppercase;
`;

export const BtnDanger = styled(Btn)`
  color: ${props => props.theme.color.danger};
  border-color: ${props => props.theme.color.danger};
`;

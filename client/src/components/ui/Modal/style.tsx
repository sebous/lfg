import styled from "styled-components";

export const ModalAPheader = styled.h2`
  display: block;
  position: relative;
  font-size: 1.5rem;
  font-weight: normal;
  color: rgba(${props => props.theme.color.text});
  text-align: right;
  margin: 0;
`;

export const ModalAPinput = styled.input`
  display: block;
  width: calc(100% - 1rem);
  border: 1px solid ${props => props.theme.color.primary};
  outline: none;
  background: ${props => props.theme.color.background};
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem;
  border-radius: 0;
`;

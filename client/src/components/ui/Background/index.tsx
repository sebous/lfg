import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: ${props => props.theme.color.background};
`;

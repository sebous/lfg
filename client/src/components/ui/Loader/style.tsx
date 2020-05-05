import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  position: absolute;
  bottom: 20%;
`;

export const LoaderInner = styled.div`
  text-align: center;
  line-height: 1;
  margin-bottom: 2rem;
`;

const animation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderBounce = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: ${props => props.theme.color.primary};
  border-radius: 100%;
  display: inline-block;
  animation: ${animation} 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
  margin-right: 0.5rem;
`;

export const LoaderBounceFirst = styled(LoaderBounce)`
  animation-delay: -0.32s;
`;

export const LoaderBounceLast = styled(LoaderBounce)`
  animation-delay: 0s;
`;

export const LoaderText = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.color.light};
`;

import styled from "styled-components";

export const PlaceCardWrapper = styled.div`
  height: 230px;
  width: 80vw;
  background: ${props => props.theme.color.backgroundLight};
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
`;

export const PlaceCartHeader = styled.h2`
  display: block;
  font-size: 1.25rem;
  color: ${props => props.theme.color.text};
  text-align: center;
`;

export const PlaceCartDescription = styled.p`
  display: block;
  font-size: 0.75rem;
  text-align: center;
`;

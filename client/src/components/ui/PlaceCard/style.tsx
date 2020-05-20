import styled from "styled-components";

export const PlaceCardWrapper = styled.div`
  height: 230px;
  position: relative;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.color.backgroundLight};
  flex: 0 0 100%;
  width: 100%;
`;

export const PlaceCardBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 55%;
  top: 0;
  left: 0;
  background: url("https://images.unsplash.com/photo-1543007631-283050bb3e8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80");
  background-size: cover;
  background-position-y: center;
  background-repeat: no-repeat;
  filter: blur(2px);
  ::after {
    content: "";
    background: ${props => props.theme.color.backgroundLight};
    opacity: 0.2;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const PlaceCardHeader = styled.h2`
  display: block;
  position: relative;
  font-size: 1.5rem;
  font-weight: normal;
  color: rgba(${props => props.theme.color.text});
  text-align: right;
  margin: 0;
  margin-bottom: 1.25rem;
  padding-top: 0.5rem;
  z-index: 1;
`;

export const PlaceCarDescription = styled.p`
  font-size: 0.75rem;
  text-align: right;
  position: relative;
  z-index: 1;
  display: inline-block;
  max-height: 3.5rem;
  overflow: hidden;
`;

export const PlaceCardBottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 1.25rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const PlaceCardsContainer = styled.div`
  position: relative;
`;

import styled from "styled-components";

export const UserIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserIconImgWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
`;

export const UserIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserIconText = styled.div`
  font-size: 10px;
  text-align: center;
`;

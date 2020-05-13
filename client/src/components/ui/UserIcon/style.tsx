import styled from "styled-components";

export const UserIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserIconImgWrapper = styled("div")<{ size: "SMALL" | "LARGE"; spaced?: boolean; border?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${props => props.theme.color.gray};
  border-style: solid;
  ${props =>
    props.size === "LARGE" &&
    `
  width: 48px;
  height: 48px;
  `}
  ${props =>
    props.size === "SMALL" &&
    `
  width: 32px;
  height: 32px;
  `}
  ${props =>
    props.spaced &&
    `
    margin-left: .4rem;
  `}
  ${props => props.border && `border-width: 2px`}
`;

export const UserIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserIconCounter = styled.span`
  font-size: 13px;
`;

export const UserIconText = styled.div`
  font-size: 10px;
  text-align: center;
`;

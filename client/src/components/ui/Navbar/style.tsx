import styled from "styled-components";

export const NavbarWrapper = styled.div`
  width: 100%;
  padding: 8px;
  height: 49px;
  background: ${props => props.theme.color.background};
  border-bottom: 1px solid ${props => props.theme.color.gray};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const NavbarHeader = styled.div`
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 0.5px;
  padding-left: 1rem;
  font-weight: bold;
  margin-right: auto;
  color: ${props => props.theme.color.primary};
`;

export const NavbarAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  overflow: hidden;
`;

export const NavbarAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NavbarUsername = styled.div`
  font-size: 0.75rem;
  margin-right: 0.75rem;
`;

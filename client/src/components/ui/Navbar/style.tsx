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
  font-size: 24px;
  line-height: 32px;
  margin-right: auto;
  color: ${props => props.theme.color.primary};
`;

export const NavbarAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  object-fit: contain;
`;

export const NavbarUsername = styled.div`
  font-size: 0.75rem;
  margin-right: 1.125rem;
`;

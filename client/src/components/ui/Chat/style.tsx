import styled from "styled-components";

export const ChatWindowContainer = styled.div`
  position: absolute;
  width: calc(100vw - 3.5rem);
  height: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  overflow: auto;
`;

export const ChatWindowInput = styled.input`
  display: block;
  width: 100%;
  outline: none;
  padding: 0.25rem 0;
  background: ${props => props.theme.color.background};
  color: rgba(${props => props.theme.color.text});
  border: 0;
  border-bottom: 1px solid ${props => props.theme.color.primary};
  font-size: 0.75rem;
  margin-top: 1rem;
`;

export const ChatSubmitBtn = styled.button`
  display: block;
  width: 2rem;
  height: 2rem;
  background: ${props => props.theme.color.primary};
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const ChatMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 0.33rem 0;
`;

export const ChatMessageSender = styled.div`
  display: block;
  flex: 0 1;
  color: rgba(${props => props.theme.color.text});
  font-size: 0.75rem;
`;

export const ChatMessageContent = styled.div`
  display: block;
  flex: 1 1;
  min-width: 0;
  color: rgba(${props => props.theme.color.textLight});
  font-size: 0.75rem;
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const ChatMessageTime = styled.div`
  display: block;
  flex: 0 1;
  color: rgba(${props => props.theme.color.textLight});
  font-size: 0.75rem;
  margin-left: auto;
`;

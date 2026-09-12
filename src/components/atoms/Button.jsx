import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colorEmailButton};
  color: ${({ theme }) => theme.onPrimary};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.1s ease;
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
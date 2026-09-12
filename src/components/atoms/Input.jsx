import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 0.37rem 1rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;
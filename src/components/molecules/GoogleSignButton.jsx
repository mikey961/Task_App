import styled from "styled-components";
import { GoogleIcon } from '../../index';

export function GoogleSignButton({ children = 'Continuar con google', ...props }) {
  return (
    <StyledButton {...props}>
      <GoogleIcon/>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.border};
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.15s ease, background 0.15s ease;
  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: ${({ theme }) => theme.surfaceAlt};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
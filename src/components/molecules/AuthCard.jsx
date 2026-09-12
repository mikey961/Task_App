import styled from "styled-components";
import { LogoMark } from '../../index';

export function AuthCard({ children }) {
  return (
    <CardWrapper>
      <HeaderWrapper>
        <LogoMark/>
        <WordMark>FlowTask</WordMark>
      </HeaderWrapper>
      {children}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 100%;
  max-width: 580px;
  padding: 2.5rem 2.25rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.bg3};
  border: 3px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowCardLogin};
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.6rem;
`;

const WordMark = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const AuthFormError = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin: -0.4rem 0 1rem;
  text-align: center;
`;

export const AuthFormSuccess = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.success};
  text-align: center;
  margin: 0 0 1rem;
`;

export const AuthFormInfo = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.5;
  text-align: center;
  margin: 0 0 1.4rem;
`;

export const AuthFormFooter = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.35rem;
  white-space: nowrap;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 1.6rem 0 0;

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: auto;
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorForgotPass};
    }
  }
`;
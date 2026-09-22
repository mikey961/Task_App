import styled from "styled-components";
import { appName, LogoMark, ThemeSwitch } from '../../index';

export function AppHeader() {
  return (
    <Bar>
      <Brand>
        <LogoMark/>
        <WordMark>
          {appName}
        </WordMark>
      </Brand>
      <ThemeSwitch/>
    </Bar>
  );
}

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 1;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const WordMark = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
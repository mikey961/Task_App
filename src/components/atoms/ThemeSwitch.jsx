import styled from "styled-components";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <ThemeButton onClick={toggleTheme}
      aria-label="Cambiar tema">
      {isDark ? <Sun size={20}/> : <Moon size={20}/>}
    </ThemeButton>
  );
}

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.bgtotal};
  color: #8F8B8B;
  &:hover {
    box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.6);
    color: ${({ theme }) => theme.colorChangeTheme};
    background: ${({ theme }) => theme.bgBtnLightTheme};
  }
`;

import styled from "styled-components";
import { v } from "../../index";
import { ThemeContext } from "../../App";
import { useContext } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <ThemeButton onClick={toggleTheme}
      aria-label="Cambiar tema">
      {isDark ? <v.iconoSun size={20}/> : <v.iconoMoon size={20}/>}
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

export function ThemeSwitchHeader() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <HeaderThemeButton onClick={toggleTheme}
      aria-label="Cambiar tema">
      {isDark ? <v.iconoSun size={20}/> : <v.iconoMoon size={20}/>}
    </HeaderThemeButton>
  );
}

const HeaderThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ theme }) => theme.bgBtnHeader};
  color: ${({ theme }) => theme.colorIconHeader};
  &:hover {
    background: ${({ theme }) => theme.bgBtnHeaderHover};
    color: ${({ theme }) => theme.colorIconHeaderHover};
  }
`;
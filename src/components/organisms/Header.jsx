import styled from "styled-components";
import { AccountMenu, appName, LogoMark, MenuHamburguesa, ThemeSwitchHeader } from "../../index";

export function Header({ onToggleSidebar }) {
  const handleReload = () => {
    window.location.reload();
  }

  return (
    <Bar>
      <MenuHamburguesa onClick={onToggleSidebar}/>
      <Brand onClick={handleReload}>
        <LogoMark/>
        <WordMark>
          {appName}
        </WordMark>
      </Brand>
      <Spacer/>
      <ThemeSwitchHeader/>
      <AccountMenu/>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: ${({ theme }) => theme.bg2};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 0.25rem;
  cursor: pointer;
  user-select: none;
`;

const WordMark = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Spacer = styled.div`
  flex: 1;
`;
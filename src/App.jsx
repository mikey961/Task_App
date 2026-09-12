import styled, { ThemeProvider } from 'styled-components';
import { Dark, Light, AuthContextProvider, MyRoutes, Sidebar, MenuHamburguesa } from './index';
import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ThemeContext = createContext(null);
const FULL_PAGE_ROUTES = ['/login', '/register', '/reset-password']

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState('dark');
  const themeStyle = theme === 'dark' ? Dark : Light;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isFullPageRoute = FULL_PAGE_ROUTES.includes(pathname);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          {!isFullPageRoute ? (
            <Container className={sidebarOpen ? 'active' : ''}>
              <div className='contentsidebar'>
                <Sidebar state={sidebarOpen}
                  setState={() => setSidebarOpen(!sidebarOpen)}
                />
              </div>
              <div className="menuhamburguesa">
                <MenuHamburguesa/>
              </div>
              <>
                <MyRoutes/>
              </>
            </Container>
          ) : (
            <MyRoutes/>
          )}
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App

const Container = styled.div`
  background: ${({ theme }) => theme.bgtotal};
`;
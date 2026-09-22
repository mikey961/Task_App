import styled, { ThemeProvider } from 'styled-components';
import { Dark, Light, AuthContextProvider, MyRoutes, Sidebar, MenuHamburguesa, Header } from './index';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const ThemeContext = createContext(null);
const FULL_PAGE_ROUTES = ['/login', '/register', '/reset-password']

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]);
  const themeStyle = theme === 'dark' ? Dark : Light;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isFullPageRoute = FULL_PAGE_ROUTES.includes(pathname);

  const handleToggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          <ToastContainer position='top-right'
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ top: '90px' }}/>
          {!isFullPageRoute ? (
            <Shell>
              <Header onToggleSidebar={handleToggleSidebar}/>
              <Body>
                <Sidebar state={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
                <Main>
                  <MyRoutes/>
                </Main>
              </Body>
            </Shell>
          ) : (
            <MyRoutes/>
          )}
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg2};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg3};
`;
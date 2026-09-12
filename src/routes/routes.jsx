import { useTheme } from 'styled-components'
import { Home, Login, ProtectedRoute, PublicRoute, ResetPassword, SignUp, UserAuth } from '../index';
import { Route, Routes } from "react-router-dom";
import { RotateLoader } from 'react-spinners';

export function MyRoutes() {
  const { user, loading } = UserAuth();
  const theme = useTheme();

  if (loading) {
    return(
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"}}>
        <RotateLoader height={60}
          width={60}
          color={theme.loader}
          size={20}
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<PublicRoute user={user} redirectTo='/'/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
      </Route>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route element={<ProtectedRoute user={user} redirectTo='/login'/>}>
        <Route path="/" element={<Home/>}/>
      </Route>
    </Routes>
  );
}
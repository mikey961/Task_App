import { createContext, use, useContext, useEffect, useState } from "react";
import { supabase, InsertarUsuarios } from '../index';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session == null) {
          setUser(null);
        } else {
          setUser(session?.user.user_metadata);
          insertarUsuario(session?.user.user_metadata, session?.user.id, session?.user?.email);
          console.log('event', event);
          console.log('session', session?.user.user_metadata);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    }
  }, []);

  const insertarUsuario = async (dataProvider, idAuthSupabase, emailAuth) => {
    const u = {
      nombre: dataProvider.name,
      apellido: dataProvider.apellido || '',
      foto: dataProvider.picture || null,
      id_auth_supabase: idAuthSupabase,
      email: emailAuth
    }

    await InsertarUsuarios(u);
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
}
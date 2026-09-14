import { create } from "zustand";
import { supabase } from '../index';

export const useAuthStore = create(() => ({
  signWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) throw new Error('Ha ocurrido un error durante la autenticación.');
    
    return data;
  },
  signUp: async (email, password, name, apellido) => {
    if (!email?.trim() || !password?.trim()) throw new Error('Los campos de correo o contraseña estan vacíos.');

    const { data,  error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          apellido: apellido,
          full_name: `${name} ${apellido}`.trim()
        }
      }
    });

    if (error) throw new Error(error.message || 'No se pudo crear la cuenta.');

    return data;
  },
  signWithEmail: async (email, password) => {
    if (!email?.trim() || !password?.trim()) throw new Error('Los campos de correo o contraseña estan vacíos.');
    
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error('El correo o la contraseña es incorrecto.');

    return data
  },
  sendEmailReset: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) throw new Error('No se pudo enviar el correo de recuperación.');
  },
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) throw new Error('No se pudo actualizar la contraseña.');
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error('Ha ocurrido un error durante el cierre de sesión.')
  }
}));

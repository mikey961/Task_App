import { create } from "zustand";
import { supabase } from '../index';

export const useAuthStore = create((set) => ({
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
  updateProfilePicture: async (file) => {
    const { data: {user} } = await supabase.auth.getUser();
    if (!user || !file) throw new Error('No hay una sesión activa o no se selecciono ninguna imagen.');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('avatars')
      .upload(filePath, file, { upsert: true });
    
    if (uploadError) throw new Error('Error al subir  la imagen al servidor.');

    const { data: publicUrlData } = supabase.storage.from('avatars')
      .getPublicUrl(filePath);

    const publicURL = publicUrlData.publicUrl;

    const { error: dbError } = await supabase.from('usuarios')
    .update({ foto: publicURL })
    .eq('id_auth_supabase', user.id);

    if (dbError) throw new Error('Error al actualizar la imagen.');

    const { data: updateUserData, error: updateError } = await supabase.auth.updateUser({
      data: {
        picture: publicURL
      }
    });

    if (updateError) throw new Error('No se pudo actualizar la foto de perfil del usuario.');

    set((state) => ({
      user: state.user 
      ? { ...state.user, picture: publicURL, foto: publicURL} 
      : updateUserData.user
    }));

    return publicURL;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error('Ha ocurrido un error durante el cierre de sesión.')
  }
}));

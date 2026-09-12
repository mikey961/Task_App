import { supabase } from '../index';

export const InsertarUsuarios = async (u) => {
  try {
    const { data } = await supabase.from('usuarios').insert(u).select();

    return data;
  } catch (error) {
    console.log('Error al insertar el usuario: ', error)
  }
}
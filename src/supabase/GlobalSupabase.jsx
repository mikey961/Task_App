import { supabase } from '../index';

const obtenerIdAuthSupabase = async () => {
  const { data: {session} } = supabase.auth.getSession();

  if (session != null) {
    const { user } = session;
    const idAuthSupabase = user.id;

    return idAuthSupabase;
  }
}
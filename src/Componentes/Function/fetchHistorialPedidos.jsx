import { supabase } from '../../CreateClient';

export async function fetchHistorialPedidos() {
  const { data, error } = await supabase.from("pedido_historial").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}


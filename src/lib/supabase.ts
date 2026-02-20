import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const supabase = createClient(url, anonKey);

// Service role client (use carefully; only server-side). Provided here for admin tooling if needed.
export const supabaseServiceRole = (() => {
  const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined;
  if (!serviceKey) return null;
  return createClient(url, serviceKey);
})();

export default supabase;

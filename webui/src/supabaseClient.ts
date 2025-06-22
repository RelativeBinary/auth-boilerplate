import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'ERROR NO SUPABASE URL DEFINED';
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY ?? 'ERROR NO SUPABASE API KEY DEFINED';
console.log('supabaseURL', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv';

// Load environment variables first
config();

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey = process.env.ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
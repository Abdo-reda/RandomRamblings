import { createClient } from "@supabase/supabase-js";
import { SupabaseService } from "../classes/supabaseServiceClass";

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
);

export const supabaseService = new SupabaseService(supabase); 
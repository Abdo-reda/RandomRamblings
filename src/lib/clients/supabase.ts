import { createClient } from "@supabase/supabase-js";
import { SupabaseService } from "../classes/supabaseService";
import { SupabaseNewsletterService } from "../classes/supabaseNewsletterService";

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
);

const supabaseService = new SupabaseService(supabase);  

export const supabaseNewsletterService = new SupabaseNewsletterService(supabaseService);
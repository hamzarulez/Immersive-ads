"use client";

// The correct import is from '@supabase/supabase-js'
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";

// No need for the auth-helpers-nextjs library here for the basic client.
// This is the modern, recommended way to create a client-side client.
export const createClient = () =>
  createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
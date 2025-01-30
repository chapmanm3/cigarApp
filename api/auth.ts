import { supabase } from "@/utils/supabase";
import { AuthResponse } from "@supabase/supabase-js";

export async function signUpUser(email: string, password: string): Promise<AuthResponse> {
  try {
    return supabase.auth.signUp({ email, password })
  }
  catch (e) {
    console.error("Auth Error", e)
    throw e
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    return await supabase.auth.signInWithPassword({ email, password })
  } catch (e) {
    //track error;
    console.error("Login Error", e)
    throw e
  }
}

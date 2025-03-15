import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import invariant from 'tiny-invariant';
import { Platform } from 'react-native';
import { Database } from '@/database.types';

const supabaseUrl = "https://chfwhyyeekccjvjvjaxv.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

invariant(supabaseAnonKey, "Supabase anon key required")

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function getUserInfo() {
  try {
    const userInfo = await supabase.auth.getUser()
  } catch (e: unknown) {

  }
}

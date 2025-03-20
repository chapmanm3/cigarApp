import { User, createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import invariant from 'tiny-invariant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

export async function getUserInfo(): Promise<User> {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Failed to retrieve user info")
    throw error
  }

  return data.user
}

export async function getUserId() {
  try {
    const userInfo = await getUserInfo()
    return userInfo.id
  } catch (e) {
    console.error("failed to get user Id")
  }
}

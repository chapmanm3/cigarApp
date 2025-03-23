import { QueryData } from "@supabase/supabase-js";
import { getUserId, supabase } from "../utils/supabase";

///.....Supabase queries.....///

const usersCigars = supabase.from('cigars').select()
export type UsersCigars = QueryData<typeof usersCigars>
export type UserCigar = UsersCigars[number]

export async function getAllCigarsSupabase(): Promise<UsersCigars> {

  const { data, error } = await usersCigars

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

type CreateCigarObject = Omit<UserCigar, "created_at" | "updated_at" | "image_url" | "id" | "user_id">

export async function createNewCigar(cigar: CreateCigarObject): Promise<null> {
  const userId = await getUserId()
  console.log(userId)
  const { data, error } = await supabase.from('cigars').insert([
    {
      ...cigar,
      user_id: userId
    }])

  if (error) {
    console.error(error)
    throw error
  }

  return null
}

export async function deleteCigar(id: number): Promise<null> {
  const { error } = await supabase
    .from('cigars')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error)
    throw error
  }

  return null
}

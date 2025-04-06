import { QueryData } from "@supabase/supabase-js";
import { getUserId, supabase } from "../utils/supabase";
import { decode } from "base64-arraybuffer";

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

type CreateCigarObject = Omit<UserCigar, "created_at" | "updated_at" | "id" | "user_id">

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

export async function updateCigar(cigar: UserCigar) {
  const userId = await getUserId()

  const cigarUpdate = {
    ...cigar,
    updated_at: new Date().toString()
  }

  const { error } = await supabase.from("cigars").upsert(cigarUpdate)

  if (error) {
    console.error(error)
    throw error
  }

  return null
}

export async function uploadCigarImage(imageUri: string): Promise<string | null> {
  const userId = await getUserId()
  const filePath = `${userId}/${new Date().getTime()}.png`;

  const options = {
    contentType: 'image/png'
  }

  const { data, error } = await supabase.storage.from('cigars').upload(filePath, decode(imageUri), options)

  if (error) {
    console.error(error)
    throw error
  }

  return data.path
}


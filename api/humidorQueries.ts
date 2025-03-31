import { getUserId, supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";


const usersHumidors = supabase.from('humidors').select()
export type UsersHumidors = QueryData<typeof usersHumidors>
export type UserHumidor = UsersHumidors[number]

export async function getAllHumidorsSupabase(): Promise<UsersHumidors> {

  const { data, error } = await usersHumidors

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

type CreateHumidorObject = Omit<UserHumidor, "created_at" | "updated_at" | "id" | "user_id">

export async function createNewHumidor(humidor: CreateHumidorObject): Promise<null> {
  const userId = await getUserId()

  const { data, error } = await supabase.from('humidors').insert({
    ...humidor,
    user_id: userId
  })

  if (error) {
    console.error(error)
    throw error
  }

  return null
}

export async function deleteHumidor(id: number): Promise<null> {
  const { error } = await supabase.from('humidors').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw error
  }

  return null
}

export async function uploadHumidorImage(imageUri: string): Promise<string | null> {
  const userId = await getUserId()
  const filePath = `${userId}/${new Date().getTime()}.png`;

  const options = {
    contentType: "image/png"
  }

  const { data, error } = await supabase.storage.from('humidors').upload(filePath, decode(imageUri), options)

  if (error) {
    console.error(error)
    throw error
  }

  return data.path
}


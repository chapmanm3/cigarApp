import { getUserId, supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";


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

type CreateHumidorObject = Omit<UserHumidor, "created_at" | "updated_at" | "image_url" | "id" | "user_id">

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

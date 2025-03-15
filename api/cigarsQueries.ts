import { Cigar, CigarForm, CigarResponse } from "@/types/cigarTypes";
import { supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function getAllCigarsQuery(): Promise<Cigar[]> {
  const authToken = window.authToken
  return axios.get<CigarResponse[]>(`${apiUrl}/cigars`, { headers: { "id-token": authToken } })
    .then(resp => {
      if (resp.data.length === 0) {
        return [];
      }
      return resp.data.map(x => ({
        id: x.id,
        name: x.name,
        brand: x.brand,
        description: x.description,
        image: x.image,
        humidorId: x.humidorId
      }))
    })
    .catch(e => {
      console.error(e)
      return []
    })
}

export async function createCigarQuery(cigarForm: CigarForm): Promise<void> {
  const authToken = window.authToken
  return axios.post(`${apiUrl}/createCigar`, { cigar: { ...cigarForm } }, { headers: { "id-token": authToken } })
}



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

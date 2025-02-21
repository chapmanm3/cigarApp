import { Humidor, HumidorForm, HumidorResponse } from "@/types/humidorTypes";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function getAllHumidorsQuery(): Promise<Humidor[]> {
  const authToken = window.authToken
  return axios.get<HumidorResponse[]>(`${apiUrl}/humidors`, { headers: { "id-token": authToken } })
    .then(resp => {
      if (resp.data.length === 0) {
        return []
      }
      return resp.data.map(x => ({
        id: x.id,
        name: x.name,
        description: x.description,
        cigars: x.cigars
      }))
    }).catch(e => {
      console.error(e)
      return []
    })
}

export async function createHumidorQuery(humidorForm: HumidorForm): Promise<void> {
  const authToken = window.authToken
  return axios.post(`${apiUrl}/createHumidor`, { humidor: { ...humidorForm } }, { headers: { "id-token": authToken } })
}

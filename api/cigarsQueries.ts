import { Cigar, CigarResponse } from "@/types/cigarTypes";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function getAllCigarsQuery(): Promise<Cigar[]> {
  return axios.get<CigarResponse[]>(`${apiUrl}/cigars`)
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

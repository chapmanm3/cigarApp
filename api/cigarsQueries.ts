import { auth } from "@/firebaseConfig";
import { Cigar, CigarForm, CigarResponse } from "@/types/cigarTypes";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function getAllCigarsQuery(): Promise<Cigar[]> {
  console.log(auth.currentUser)
  const authToken = window.authToken
  console.log("Auth Token: ", authToken)
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
  const authToken = await auth.currentUser?.getIdToken()
  return axios.post(`${apiUrl}/createCigar`, { cigar: { ...cigarForm } }, { headers: { "id-token": authToken } })
}

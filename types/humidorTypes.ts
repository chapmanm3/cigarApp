import { Cigar } from "./cigarTypes";

export type Humidor = {
  id: number;
  name: string;
  description?: string;
  cigars: Cigar;
}

export type HumidorResponse = Humidor & {
  userId: number;
}

export type HumidorForm = {
  name: string;
  description?: string;
}

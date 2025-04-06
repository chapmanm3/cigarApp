export type CigarResponse = {
  id: number,
  name: string,
  brand?: string,
  description?: string,
  image?: string,
  humidorId?: number,
  userId?: number,
}

export type Cigar = {
  id: number,
  name: string,
  brand?: string,
  description?: string,
  image?: string,
  humidorId?: number,
}

export type CigarForm = {
  name: string,
  description?: string,
}


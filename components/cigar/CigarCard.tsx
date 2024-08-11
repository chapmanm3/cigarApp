import { Cigar } from "@/types/cigarTypes";
import { Text } from "react-native";

interface Props {
  cigar: Cigar
}

export default function CigarCard({ cigar }: Props) {
  
  return (
    <>
      <Text>{cigar.id}: {cigar.name}</Text>
    </>
  )
}

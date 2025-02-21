import { Cigar } from "@/types/cigarTypes";
import { Image, Text, View } from "react-native";
import { cigarCardStyles } from "./cigarCardStyles";

interface Props {
  cigar: Cigar
}

export default function CigarCard({ cigar }: Props) {
  console.log(cigar)

  return (
    <View style={cigarCardStyles.mainContainer}>
      <View style={cigarCardStyles.cardImageContainer}>
      {<Image style={{width: "100%", height: "100%"}} />}
      </View>
      <View style={cigarCardStyles.textContainer}>
        <Text>Name: {cigar.name}</Text>
        <Text>Brand: {cigar.brand}</Text>
        <Text>Description: {cigar.description}</Text>
      </View>
    </View>
  )
}

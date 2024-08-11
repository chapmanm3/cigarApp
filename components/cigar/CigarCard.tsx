import { Cigar } from "@/types/cigarTypes";
import { Image, Text, View } from "react-native";
import { cigarCardStyles } from "./cigarCardStyles";

interface Props {
  cigar: Cigar
}

export default function CigarCard({ cigar }: Props) {

  return (
    <View style={cigarCardStyles.mainContainer}>
      <View style={cigarCardStyles.cardImageContainer}>
        <Image style={{ height: '100%', width: '100%' }} source={require('@/assets/images/new_icon.png')} />
      </View>
      <View style={cigarCardStyles.textContainer}>
        <Text>{cigar.id}: {cigar.name}</Text>
      </View>
    </View>
  )
}

import { Humidor } from "@/types/humidorTypes"
import { humidorCardStyles } from "./humidorCardStyles"
import { Image, Text, View } from "react-native"

interface Props {
  humidor: Humidor
}

export default function HumidorCard({ humidor }: Props) {
  console.log(humidor)

  return (
    <View style={humidorCardStyles.mainContainer}>
      <View style={humidorCardStyles.cardImageContainer}>
        <Image style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={humidorCardStyles.textContainer}>
        <Text>Name: {humidor.name}</Text>
        <Text>Description: {humidor.description}</Text>
      </View>
    </View>
  )
}

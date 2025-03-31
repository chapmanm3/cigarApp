import { UserHumidor } from "@/api/humidorQueries"
import { humidorListStyles } from "./humidorListStyles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import cigarListStyles from "../cigars/cigarListStyles";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Props {
  item: UserHumidor,
  onPressItem: (item: UserHumidor) => void;
}

export const HumidorListItem = ({ item, onPressItem }: Props) => {
  const styles = cigarListStyles;
  const [image, setImage] = useState<string | null>(null)

  const loadImage = async (imagePath: string) => {
    supabase.storage
      .from('humidors')
      .download(imagePath)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      });
  }

  useEffect(() => {
    if (item.image_url) {
      loadImage(item.image_url)
    }
  }, [item])

  return (
    <TouchableOpacity
      style={[
        styles.cigarItem,
        // theme === 'dark' && styles.darkCigarItem, //Darkmode
      ]}
      onPress={() => onPressItem(item)}
    >
      <Image
        source={image ? { uri: image } : require("@/assets/images/newIcon.png")}
        style={styles.cigarImage}
      />
      <View style={styles.cigarInfo}>
        <Text
          style={[
            styles.cigarName,
            // theme === 'dark' && styles.darkCigarName, //Darkmode
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.cigarDetails,
            // theme === 'dark' && styles.darkCigarDetails, //Darkmode
          ]}
        >
          {item.capacity}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

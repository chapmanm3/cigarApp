import { Image, Text, TouchableOpacity, View } from "react-native";
import cigarListStyles from "./cigarListStyles";
import { UserCigar } from "@/api/cigarsQueries";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Props {
  item: UserCigar,
  onPressCigar: (item: UserCigar) => void;
}

export const CigarListItem = ({ item, onPressCigar }: Props) => {
  const styles = cigarListStyles;
  const [image, setImage] = useState<string | null>(null)

  const loadImage = async (imagePath: string) => {
    supabase.storage
      .from('cigars')
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
      onPress={() => onPressCigar(item)}
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
          {item.brand}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

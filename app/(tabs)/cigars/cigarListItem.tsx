import { Image, Text, TouchableOpacity, View } from "react-native";
import cigarListStyles from "./cigarListStyles";
import { UserCigar } from "@/api/cigarsQueries";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useSupabaseImage } from "@/hooks/useSupabseImage";

interface Props {
  item: UserCigar,
  onPressCigar: (item: UserCigar) => void;
}

export const CigarListItem = ({ item, onPressCigar }: Props) => {
  const styles = cigarListStyles;
  const { imageUri } = useSupabaseImage(item.image_url ?? undefined)

  return (
    <TouchableOpacity
      style={[
        styles.cigarItem,
        // theme === 'dark' && styles.darkCigarItem, //Darkmode
      ]}
      onPress={() => onPressCigar(item)}
    >
      <Image
        source={imageUri ? { uri: imageUri } : require("@/assets/images/newIcon.png")}
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

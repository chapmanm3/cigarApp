import { UserHumidor } from "@/api/humidorQueries"
import { humidorListStyles } from "./humidorListStyles";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: UserHumidor,
  onPressItem: (item: UserHumidor) => void;
}

export const HumidorListItem = ({ item, onPressItem }: Props) => {
  const styles = humidorListStyles;

  return (
    <TouchableOpacity
      style={[
        styles.humidorItem,
        // theme === 'dark' && styles.darkCigarItem, //Darkmode
      ]}
      onPress={() => onPressItem(item)}
    >
      <Image
        source={require("@/assets/images/newIcon.png")}
        style={styles.humidorImage}
      />
      <View style={styles.humidorInfo}>
        <Text
          style={[
            styles.humidorName,
            // theme === 'dark' && styles.darkCigarName, //Darkmode
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.humidorDetails,
            // theme === 'dark' && styles.darkCigarDetails, //Darkmode
          ]}
        >
          {item.capacity}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

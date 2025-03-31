import { UserHumidor } from "@/api/humidorQueries"
import { humidorListStyles } from "./humidorListStyles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import cigarListStyles from "../cigars/cigarListStyles";

interface Props {
  item: UserHumidor,
  onPressItem: (item: UserHumidor) => void;
}

export const HumidorListItem = ({ item, onPressItem }: Props) => {
  const styles = cigarListStyles;

  return (
    <TouchableOpacity
      style={[
        styles.cigarItem,
        // theme === 'dark' && styles.darkCigarItem, //Darkmode
      ]}
      onPress={() => onPressItem(item)}
    >
      <Image
        source={require("@/assets/images/newIcon.png")}
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

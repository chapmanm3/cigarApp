import { Cigar } from "@/types/cigarTypes";
import { Image, Text, TouchableOpacity, View } from "react-native";
import cigarListStyles from "./cigarListStyles";
import { UserCigar } from "@/api/cigarsQueries";

interface Props {
  item: UserCigar,
  onPressCigar: (item: UserCigar) => void;
}

export const CigarListItem = ({ item, onPressCigar }: Props) => {
  const styles = cigarListStyles;

  return (
    <TouchableOpacity
      style={[
        styles.cigarItem,
        // theme === 'dark' && styles.darkCigarItem, //Darkmode
      ]}
      onPress={() => onPressCigar(item)}
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
          {item.brand}
        </Text>
      </View>
    </TouchableOpacity>
  )
};



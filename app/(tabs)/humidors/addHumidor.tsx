import AddHumidorForm from "@/components/humidors/AddHumidorForm";
import { View } from "react-native";

export default function AddHumidor() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{
        width: '50%',
        flex: 1,
      }}>
        <AddHumidorForm />
      </View>
    </View>
  );
}

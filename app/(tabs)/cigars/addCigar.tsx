import AddCigarForm from "@/components/cigar/AddCigarForm";
import { View } from "react-native";

export default function AddCigar() {
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
        <AddCigarForm />
      </View>
    </View>
  );
}

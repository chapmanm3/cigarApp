import { getAllCigarsQuery } from "@/api/cigarsQueries";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(true)
  const [cigars, setCigars] = useState([])

  useEffect(() => {
    await getAllCigarsQuery()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ?
        <ActivityIndicator />
        : <FlatList
          
        />}
    </View>
  );
}

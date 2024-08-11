import { getAllCigarsQuery } from "@/api/cigarsQueries";
import CigarCard from "@/components/cigar/CigarCard";
import type { Cigar } from "@/types/cigarTypes";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(true)
  const [cigars, setCigars] = useState<Cigar[]>([])

  useEffect(() => {
    getAllCigarsQuery()
      .then(cigars => {
        setCigars(cigars)
      })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: '50%',
          flex: 1,
        }}
      >
        <FlatList
          data={cigars}
          renderItem={({ item }) => <CigarCard cigar={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

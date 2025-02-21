import { getAllHumidorsQuery } from "@/api/humidorQueries";
import { SessionContext } from "@/components/contexts/UserContext";
import HumidorCard from "@/components/humidors/HumidorCard";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import type { Cigar } from "@/types/cigarTypes";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Humidors() {
  const [isLoading, setIsLoading] = useState(true)
  const [humidors, setHumidors] = useState<Cigar[]>([])
  const userSession = useContext(SessionContext)

  useEffect(() => {
    getAllHumidorsQuery()
      .then(humidors => {
        setHumidors(humidors)
      })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false))
  }, [userSession])

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <Center className="overflow-scroll">
        <VStack space="md" className="w-full max-w-[500px] overflow-scroll">
          {humidors.length > 0 ? humidors.map(humidor => <HumidorCard humidor={humidor} key={humidor.id} />) : null}
        </VStack>
      </Center>
      <Link push href="/humidors/addHumidor" asChild>
        <Pressable style={styles.addHumidorButton}>
          <Text>Add Humidor</Text>
        </Pressable>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  addHumidorButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})

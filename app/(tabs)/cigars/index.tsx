import { getAllCigarsQuery } from "@/api/cigarsQueries";
import CigarCard from "@/components/cigar/CigarCard";
import { SessionContext } from "@/components/contexts/UserContext";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import type { Cigar } from "@/types/cigarTypes";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(true)
  const [cigars, setCigars] = useState<Cigar[]>([])
  const userSession = useContext(SessionContext)

  useEffect(() => {
    getAllCigarsQuery()
      .then(cigars => {
        setCigars(cigars)
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
          {cigars.length > 0 ? cigars.map(cigar => <CigarCard cigar={cigar} key={cigar.id} />) : null}
        </VStack>
      </Center>
      <Link push href="/cigars/addCigar" asChild>
        <Pressable style={styles.addCigarButton}>
          <Text>Add Cigar</Text>
        </Pressable>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  addCigarButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})

import { UsersCigars, getAllCigarsQuery, getAllCigarsSupabase } from "@/api/cigarsQueries";
import CigarCard from "@/components/cigar/CigarCard";
import { SessionContext } from "@/components/contexts/UserContext";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import type { Cigar } from "@/types/cigarTypes";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import CigarList from "./cigarList";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(false)
  const [cigars, setCigars] = useState<UsersCigars>([])
  const userSession = useContext(SessionContext)

  useEffect(() => {
    const fetchCigars = async () => {
      setIsLoading(true)
      try {
        const cigars = await getAllCigarsSupabase()
        setCigars(cigars)
      } catch (e) {
        console.error(e)
        setCigars([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCigars()
  }, [userSession])

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <CigarList cigars={cigars} />
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

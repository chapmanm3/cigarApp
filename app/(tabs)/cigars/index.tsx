import { UsersCigars, getAllCigarsQuery, getAllCigarsSupabase } from "@/api/cigarsQueries";
import CigarCard from "@/components/cigar/CigarCard";
import { SessionContext } from "@/components/contexts/UserContext";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import type { Cigar } from "@/types/cigarTypes";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CigarList from "./cigarList";
import cigarListStyles from "./cigarListStyles";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(false)
  const [cigars, setCigars] = useState<UsersCigars>([])
  const userSession = useContext(SessionContext)

  const styles = cigarListStyles

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

  const onPressAddCigar = () => {
    router.push("/cigars/addCigar")
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <View style={styles.container}>
      <CigarList cigars={cigars} />
      <Pressable style={styles.addButton} onPress={onPressAddCigar}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

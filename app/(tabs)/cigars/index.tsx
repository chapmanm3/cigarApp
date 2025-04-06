import { UsersCigars, getAllCigarsSupabase } from "@/api/cigarsQueries";
import { SessionContext } from "@/components/contexts/UserContext";
import type { Cigar } from "@/types/cigarTypes";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import CigarList from "./cigarList";
import cigarListStyles from "./cigarListStyles";

export default function Cigar() {
  const [isLoading, setIsLoading] = useState(false)
  const [cigars, setCigars] = useState<UsersCigars>([])
  const userSession = useContext(SessionContext)

  const styles = cigarListStyles

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

  useEffect(() => {
    fetchCigars()
  }, [userSession])

  const onPressAddCigar = () => {
    router.push("/cigars/addCigar")
  }

  if (isLoading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={styles.container}>
      <CigarList cigars={cigars} fetchFunction={fetchCigars} loading={isLoading} />
      <Pressable style={styles.addButton} onPress={onPressAddCigar}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

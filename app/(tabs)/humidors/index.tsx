import { UserHumidor, getAllHumidorsSupabase } from "@/api/humidorQueries";
import { SessionContext } from "@/components/contexts/UserContext";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { HumidorsList } from "./humidorList";
import cigarListStyles from "../cigars/cigarListStyles";

export default function Humidors() {
  const [isLoading, setIsLoading] = useState(true)
  const [humidors, setHumidors] = useState<UserHumidor[]>([])
  const userSession = useContext(SessionContext)
  const styles = cigarListStyles

  const fetchHumidors = async () => {
    setIsLoading(true)
    try {
      const humidors = await getAllHumidorsSupabase()
      setHumidors(humidors)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHumidors()
  }, [userSession])

  const onPressAddHumidorHandler = () => {
    router.push("/humidors/addHumidor")
  }

  if (isLoading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={styles.container}>
      <HumidorsList humidors={humidors} fetchFunction={fetchHumidors} loading={isLoading} />
      <Pressable style={styles.addButton} onPress={onPressAddHumidorHandler}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

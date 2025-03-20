import { UserHumidor, getAllHumidorsSupabase } from "@/api/humidorQueries";
import { SessionContext } from "@/components/contexts/UserContext";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { humidorListStyles } from "./humidorListStyles";
import { HumidorsList } from "./humidorList";

export default function Humidors() {
  const [isLoading, setIsLoading] = useState(true)
  const [humidors, setHumidors] = useState<UserHumidor[]>([])
  const userSession = useContext(SessionContext)
  const styles = humidorListStyles

  useEffect(() => {
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

    fetchHumidors()
  }, [userSession])

  const onPressAddHumidorHandler = () => {
    router.push("/humidors/addHumidor")
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <View style={styles.container}>
      <HumidorsList humidors={humidors} />
      <Pressable style={styles.addButton} onPress={onPressAddHumidorHandler}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

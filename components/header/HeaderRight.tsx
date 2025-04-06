import { supabase } from "@/utils/supabase"
import { User } from "@supabase/supabase-js"
import { router } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { SessionContext } from "../contexts/UserContext"
import { Pressable, StyleSheet, Text } from "react-native"
import { TabBarIcon } from "../navigation/TabBarIcon"

export const HeaderRight = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const sesssionContext = useContext(SessionContext)

  useEffect(() => {
    const userInfo = sesssionContext?.user
    if (userInfo) {
      setUserInfo(sesssionContext.user)
    } else {
      setUserInfo(null)
    }
  }, [sesssionContext])

  return (
    userInfo ?
      <UserAvatar user={userInfo} /> :
      <LoginButton />
  )
}

const UserAvatar = ({ user }: { user: User }) => {

  const onPressHandler = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.navigate('/')
    }
  }

  return (
    <Pressable style={{ margin: 2 }}>
      <TabBarIcon name="person-circle" />
    </Pressable>
  )
}

const LoginButton = () => {
  return (
    <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
      <Text style={styles.primaryButtonText}>Login</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#654321',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
})

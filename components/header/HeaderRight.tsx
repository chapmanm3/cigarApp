import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu"
import { supabase } from "@/utils/supabase"
import { User } from "@supabase/supabase-js"
import { Link, router } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable } from "../ui/pressable"

export const HeaderRight = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  useEffect(() => {
    const getUserInfo = async () => {
      const userSession = await supabase.auth.getSession()
      if (userSession.data.session?.user) {
        setUserInfo(userSession.data.session?.user)
      }
    }
    getUserInfo()
  }, [])

  return (
    <Box className="m-2">
      {userInfo !== null ?
        <UserAvatar user={userInfo} /> :
        <UserActionMenu />
      }
    </Box>
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
    <Menu
      placement="bottom left"
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps}>
            <Avatar size="md">
              <AvatarFallbackText>{user.email}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'userImgUrlHere',
                }}
              />
              <AvatarBadge />
            </Avatar >
          </Pressable>
        )
      }}
    >

      <MenuItem>
        <MenuItemLabel size="sm" className="w-full" onPress={onPressHandler}>Sign out</MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}

const UserActionMenu = () => {
  return (
    <Menu
      placement="bottom left"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps}>
            <ButtonText>Sign In</ButtonText>
          </Button>
        )
      }}
    >
      <MenuItem key="Create account" textValue="Create account">
        <Link href="/createAccount" asChild>
          <MenuItemLabel size="sm" className="w-full">Create account</MenuItemLabel>
        </Link>
      </MenuItem>
      <MenuItem key="Sign in" textValue="Sign in">
        <Link href="/login" asChild>
          <MenuItemLabel size="sm" className="w-full">Sign in</MenuItemLabel>
        </Link>
      </MenuItem>
    </Menu>
  )
}

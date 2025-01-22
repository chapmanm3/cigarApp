import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu"
import { Link } from "expo-router"
import { User } from "firebase/auth"
import { useEffect, useState } from "react"
import { getUserInfo } from "./utils/asyncStorage"

export const HeaderRight = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      const user = await getUserInfo()
      setUserInfo(user)
    }
    loadUserData()
  }, [])

  return (
    <Box className="mr-2">
      {userInfo !== null ?
        <UserAvatar user={userInfo} /> :
        <UserActionMenu />
      }
    </Box>
  )
}

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar size="md">
      <AvatarFallbackText>{user.displayName}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: 'userImgUrlHere',
        }}
      />
      <AvatarBadge />
    </Avatar >
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

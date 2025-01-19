import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu"
import { Link } from "expo-router"
import { useState } from "react"

export const HeaderRight = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <Box className="mr-2">
      {isLoggedIn ?
        <UserAvatar /> :
        <UserActionMenu />
      }
    </Box>
  )
}

const UserAvatar = () => {
  return (
    <Avatar size="md">
      < AvatarFallbackText > Jane Doe</AvatarFallbackText >
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
          <MenuItemLabel size="sm">Create account</MenuItemLabel>
        </Link>
      </MenuItem>
      <MenuItem key="Sign in" textValue="Sign in">
        <Link href="/signup" asChild>
          <MenuItemLabel size="sm">Sign in</MenuItemLabel>
        </Link>
      </MenuItem>
    </Menu>
  )
}

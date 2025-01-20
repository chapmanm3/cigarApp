import { User } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserInfoKey = 'userInfo'

export const setUserInfo = async (user: User) => {
  try {
    await AsyncStorage.setItem(UserInfoKey, JSON.stringify(user))
  } catch (e) {
    //TODO: Catch error
  }
}

export const getUserInfo = async () => {
  try {
    const userJSON = await AsyncStorage.getItem(UserInfoKey)
    return userJSON !== null ? JSON.parse(userJSON) : null;
  } catch (e) {
    //TODO: Error handling
  }
}

import { setUserInfo } from "@/components/utils/asyncStorage";
import { auth } from "@/firebaseConfig";
import { UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function signUpUser(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function loginUser(email: string, password: string): Promise<UserCredential> {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    await setUserInfo(user.user)
    return user
  } catch (e) {
    //track error;
    throw e
  }
}

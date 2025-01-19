import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function signUpUser(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function loginUser(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password)
}

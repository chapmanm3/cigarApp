import { auth } from "@/firebaseConfig";
import { UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export function signUpUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCred: UserCredential) => { })
    .catch(err => console.error("Fuck user creation broke: ", err))
}

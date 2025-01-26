import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";


export const useFirebaseCurrentUser = (): User | undefined => {
  const [currentUser, setCurrentUser] = useState<User>();

  auth.onAuthStateChanged((user) => {
    console.log("Auth State Updated")
    if (user) {
      setCurrentUser(user)
    }
  })
  return currentUser
}

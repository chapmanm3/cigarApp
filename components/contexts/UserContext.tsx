import { supabase } from "@/utils/supabase"
import { Session } from "@supabase/supabase-js"
import { PropsWithChildren, createContext, useEffect, useState } from "react"

export const SessionContext = createContext<Session | null>(null)

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    console.log("Session Updated!")
  }, [session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

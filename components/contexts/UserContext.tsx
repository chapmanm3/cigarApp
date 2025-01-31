import { supabase } from "@/utils/supabase"
import { Session } from "@supabase/supabase-js"
import { PropsWithChildren, createContext, useEffect, useState } from "react"

export const SessionContext = createContext<Session | null>(null)

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
          window.authToken = session.access_token
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

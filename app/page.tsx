
"use client"

import { useRouter } from "next/navigation"
import firebase_app from "./firebsae-config"

export default function page() {
  const router = useRouter()

  if (!localStorage.getItem("token")) {
    router.push("/auth")
  }

  else{
    router.push("/home")
    
  }
  return <main>  </main>
}

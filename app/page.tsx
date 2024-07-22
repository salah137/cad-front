
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"

export default function page() {
  const router = useRouter()
 
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      router.push("/auth");
    } else {
      router.push("/home");
    }
  }, []); 
    return <main>  </main>
}





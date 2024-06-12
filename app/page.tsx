
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
  const router = useRouter()
 
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/auth");
    } else {
      router.push("/home");
    }
  }, []); 
    return <main>  </main>
}





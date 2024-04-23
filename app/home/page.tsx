
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function page() {
    const router = useRouter()
    useEffect(() => {
        router.push("/home/annonces");
      }, []); // Empty dependency array to run only once on mount
        return <main>  </main>
}

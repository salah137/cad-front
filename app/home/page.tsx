
"use client"

import { useRouter } from "next/navigation"

export default function page() {
    const router = useRouter()
    router.push("/home/annonces")
    return <main>  </main>
}

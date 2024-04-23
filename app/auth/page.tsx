"use client"
import { useEffect, useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import back from "../assets/images/back.png"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function page() {

    const [seePassword, setPasswordObs] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const router = useRouter()

    return <main>
        <div className="form">

            <div>
                <h1>Be in our world</h1>
                <h3>grow your skills</h3>
            </div>

            <div>
                <input type="text" placeholder="your email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />

                <div className="password">
                    <input type={seePassword ? "text" : "password"} placeholder="your password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <span className="" onClick={() => {
                        setPasswordObs(
                            (pass) => !pass
                        )
                    }}>
                        {
                            seePassword ?
                                <FaLockOpen />
                                :
                                <FaLock />
                        }
                    </span>
                </div>
                {err ? <p style={
                    {
                        color: "red"
                    }
                }>Invalid Email Or Password</p> : <></>}
            </div>

            <div>
                <button className="login" onClick={
                    async () => {

                        let res = await fetch(`${process.env.NEXT_PUBLIC_URL}/signIn`, {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(
                                {
                                    "email": email,
                                    "password": password
                                }
                            )
                        })

                        let data = await res.json()

                        if (data == "Invalid email or password") {
                            setErr(true)
                        } else {
                            if (typeof window !== 'undefined'){
                            localStorage.setItem("token", data["token"])
                            localStorage.setItem("id", data["id"])
                            localStorage.setItem("type", data["type"])
                            router.push("/home")
                        }}

                    }
                }>
                    Login
                </button>


                <div className="or">

                    <div className="line"></div>
                    <p>or</p>
                    <div className="line"></div>

                </div>

                <Link href={"/set-up"}><button className="set_up">
                    set up
                </button></Link>
            </div>

            <h3>contact us</h3>
        </div>

        <Image src={back} alt="club" className="back" />
    </main>
}

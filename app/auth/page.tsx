"use client"
import { useEffect, useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import back from "../assets/images/back.png"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebase_app from "../firebsae-config"
import ensa from "../assets/images/ensa.png"
import cad from "../assets/images/cad-logo.png"
import insta from "../assets/images/insta.png"
import linked from "../assets/images/linkedin.png"

export default function page() {
    const auth = getAuth(firebase_app)

    const [seePassword, setPasswordObs] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const router = useRouter()

    return <main>
        <div className="form">

        <div className="logos">
          <Image src={ensa} alt="ensa" className="ensa_image" />
          <Image src={cad} alt="cad" className="ensa_image" />

        </div>

            <div>
                <h1>Be in our world</h1>
                <h3>grow your skills</h3>
            </div>

            <div>
                <input type="text" placeholder="Your Email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />

                <div className="password">
                    <input type={seePassword ? "text" : "password"} placeholder="Your Password" onChange={(e) => {
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
                        try {
                            const user = await signInWithEmailAndPassword(auth, email, password)

                            if (typeof window !== 'undefined') {
                                localStorage.setItem("email", `${user.user.email}`)
                                router.push("/home")
                            }
                        } catch (e) {
                            setErr(true)
                        }

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
            <footer>
            <h1>Contacte Us : </h1>
            <div className="contact">
                <div className="infos">
                    <h2 className="email">clubartsetdesign@gmail.com</h2>
                </div>

                <div className="social">
                   <a href="https://www.instagram.com/club_arts_et_design/" target="_blank"><Image src={insta} alt="insta" className="sc" /></a> 
                    <a href="https://www.linkedin.com/company/club-art-design/" target="_blank"><Image src={linked} alt="face" className="sc" /></a>

                </div>
            </div>
        </footer>
        </div>

        <Image src={back} alt="club" className="back" />
    </main>
}

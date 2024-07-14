"use client"
import { useEffect, useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import back from "../assets/images/back.png"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import firebase_app from "../firebsae-config"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import ensa from "../assets/images/ensa.png"
import cad from "../assets/images/cad-logo.png"
import insta from "../assets/images/insta.png"
import linked from "../assets/images/linkedin.png"

export default function page() {

  const auth = getAuth(firebase_app)
  const db = getFirestore(firebase_app)

  const [seePassword, setPasswordObs] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [err, setErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const router = useRouter()
  const [c, setC] = useState<any>()
  useEffect(
    () => {
      setC(process.env.NEXT_PUBLIC_ADMIN_CODE)
    }, []
  )

  return <main style={{
    backgroundColor : "#b3864b"
  }}>
    <div className="form">

      <div>
        <div className="logos">
          <Image src={ensa} alt="ensa" className="ensa_image" />
          <Image src={cad} alt="cad" className="ensa_image" />

        </div>
        <h1>Be in our world</h1>
        <h3>grow your skills</h3>
      </div>

      <div>

        <input type="text" placeholder="your email" value={email} onChange={
          (e) => {
            setEmail(e.target.value)
          }
        } />

        {emailErr ?
          <p>invalid Email</p> : <></>}

        <div className="password">
          <input type={seePassword ? "text" : "password"} placeholder="your password" value={password} onChange={
            (e) => {
              setPassword(e.target.value)
            }
          } />
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
        {passErr ?
          <h3>password should have more than 8 characters</h3> : <></>}

        <input type="text" placeholder="your name" onChange={
          (e) => {
            setName(e.target.value)

          }
        } value={name} />

      </div>
      {err ? <p style={
        {
          color: "red"
        }
      }>Invalid Email Or Password</p> : <></>}

      <div>
        <button className="login" onClick={
          async () => {
            console.log("hi");
            console.log(c);


            if (!(password == "" && name == "" && email == "") && validateEmail(email) && password.length >= 8) {
              try {
                const u = await createUserWithEmailAndPassword(auth, email, password)
                const res = await setDoc(doc(db, "users", `${u.user.email}`), {
                  "uid": u.user.uid,
                  "type": false
                })

                if (typeof window !== 'undefined') {
                  localStorage.setItem("email", `${u.user.email}`)
                  router.push("/home")
                }
              } catch (e) {
                setErr(true)
              }
            }
          }
        }>
          Set Up
        </button>

        <div className="or">
          <div className="line"></div>
          <p>or</p>
          <div className="line"></div>
        </div>

        <Link href={"/auth"}>
          <button className="set_up" >
            log in
          </button>
        </Link>

      </div>
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

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


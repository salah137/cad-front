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

export default function page() {
  
  const auth = getAuth(firebase_app)
  const db = getFirestore(firebase_app)

  const [seePassword, setPasswordObs] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [cellule, setCellule] = useState("")
  const [err, setErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [code, setCode] = useState("")
  const router = useRouter()
  const [c, setC] = useState<any>()
  useEffect(
    () => {
      setC(process.env.NEXT_PUBLIC_ADMIN_CODE)
    }, []
  )

  return <main>
    <div className="form">

      <div> 
        <Image src={ensa} alt="ensa"/>
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
          <h3>password shouldd have more than 8 characters</h3> : <></>}

        <input type="text" placeholder="your name" onChange={
          (e) => {
            setName(e.target.value)

          }
        } value={name} />

        <input type="text" placeholder="your cellule" value={cellule} onChange={
          (e) => {
            setCellule(e.target.value)
          }
        } />

        <div className="is-admin">
          <input type="checkbox" checked={isAdmin} onChange={() => {
            setAdmin((s) => !s)
          }}></input>
          <h3>admin</h3>
        </div>

        {
          isAdmin ?
            <input type="text" placeholder="your code" onChange={
              (e) => {
                setCode(e.target.value)

              }
            } value={code} />
            : <></>
        }
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

            console.log((((isAdmin && code == c) || (!isAdmin))));

            if (!(password == "" && name == "" && cellule == "" && email == "") && validateEmail(email) && password.length >= 8 && (((isAdmin && code == c) || (!isAdmin)))) {
              try {
                const u = await createUserWithEmailAndPassword(auth, email, password)
                const res = await setDoc(doc(db, "users", `${u.user.email}`), {
                  "uid": u.user.uid,
                  "type": isAdmin
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
      <h3>contact us</h3>
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


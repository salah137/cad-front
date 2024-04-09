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
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [cellule, setCellule] = useState("")
  const [err, setErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [code, setCode] = useState("")
  const router = useRouter()
  const [c,setC] = useState<any>()
  useEffect(
    ()=>{
      setC(process.env.NEXT_PUBLIC_ADMIN_CODE)
    },[]
  )
  
  return <main>
    <div className="form">

      <div>
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

              let res = await fetch("http://localhost:5000/signUp", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "name": name,
                  "email": email,
                  "password": password,
                  "cellule": cellule,
                  "userType": isAdmin ? 1 : 0
                }),
              })



              let data = await res.json()

              if (data == "Invalid email or password" || data == "'Email address is already in use.'") {
                setErr(true)
              } else {
                localStorage.setItem("token",data["token"])
                localStorage.setItem("id",data["id"])
                localStorage.setItem("type",data["type"])
                console.log(data["token"],data["id"],data["type"]);
                router.push("/home")
              }


            } else {
              if (!validateEmail(email)) {
                setEmailErr(true)
              }
              if (password.length < 8) {
                setPassErr(false)
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


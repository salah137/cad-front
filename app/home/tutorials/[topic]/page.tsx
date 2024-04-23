"use client"
import { useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/app/firebsae-config";
import { useParams } from 'react-router-dom'
import Link from "next/link";

export default function page() {
    const params = useParams<{ topic: string }>()

    const [add, setAdd] = useState(false)
    const [image, setImage] = useState<any>()
    const [file, setFile] = useState<any>()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userType,setUserType] = useState<any>()
    const [token,setToken] = useState<any>()
    const [id,setId]=useState<any>()

    const [tutorials, setTutorials] = useState([])

    useEffect(
        () => {
            if (typeof window !== 'undefined'){
            setUserType(localStorage.getItem('type'));
            setId(Number(localStorage.getItem("id")))
           setToken(localStorage.getItem("token"))
            }
        
            getTutorial()
            console.log(tutorials);


        }, []
    )

    let headers = {
        Accept: "application/json", // Example header
        "Content-Type": "application/json",
        'Authorization': `${token}`
    };

    const uploadImage = async () => {
        const metadata = {
            // Use underscores or camelCase
            contentType: 'image/png',
            custom_key: 'some value',  // Using underscores
            customKeyValue: 'some value', // Using camelCase
        };

        const storage = getStorage(firebase_app)
        const fileRef = ref(storage, `images/${title}`)
        uploadBytes(fileRef, image, metadata)
        await uploadBytes(fileRef, image, metadata)
        return (await getDownloadURL(fileRef));
    }

    const createTutotial = async () => {
        if (title && description && file) {
            const img = await uploadImage()
            await fetch(`${process.env.NEXT_PUBLIC_URL}/tutorial/addTutorial`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "image": img,
                    "topic": params.topic
                })
            })

        }
    }

    const getTutorial = () => {
        (async () => {
            const url = `${process.env.NEXT_PUBLIC_URL}/tutorial/getTutorials?topic=${params.topic}`;

            const data = await fetch(
                url, {
                headers: headers,
                method: "GET",

            }
            )
            let ddd =(await data.json());
            console.log(ddd);
            
            setTutorials(ddd)
        })()
    }

    return <main>
        {userType == "1" && !add ?
            <div className="btn" onClick={
                () => {
                    setAdd(true)
                }
            }>
                <IoMdAdd />
            </div> :
            <></>}
        {
            add ?
                <div className="adding-ann">
                    <BiExit className="exit-add" onClick={
                        () => {
                            setFile(null)
                            setImage('')
                            setAdd(false)
                        }
                    } />

                    <input type="text" placeholder="tutorial title" onChange={
                        (e) => {
                            setTitle(e.target.value)
                        }
                    }></input>

                    <textarea className="desc" placeholder="tutorial description" onChange={
                        (e) => {
                            setDescription(e.target.value)
                        }
                    }></textarea>

                    <div className="select-img" onClick={
                        () => {
                            let element: HTMLElement = document.querySelector("#file-upload") as HTMLElement;
                            element.click()
                        }
                    }>
                        <input type="file" accept="image/* && video/*" id="file-upload" hidden onChange={
                            ({
                                target: { files }
                            }) => {
                                files![0] && setImage(files![0])
                                if (files![0]) {
                                    setFile(URL.createObjectURL(files![0]))
                                    //setToshare(files![0].stream)
                                }
                            }
                        } />
                        {file ? <Image src={file} alt="" width={100} height={100} className="img-ann" /> : <FaFileUpload />}
                    </div>

                    <button onClick={
                        async () => {
                            console.log("Hi");

                            await createTutotial()
                            await getTutorial()
                            setAdd(false)
                        }
                    }>
                        <IoMdAdd />

                    </button>
                </div>
                : <></>
        }
        <div className="tutorials-list">
            {(tutorials && !add) && (
                <div className="tutorials-list">
                    {tutorials.map((e) => {
                        return (
                            <Link className="tuto"  href={`/home/tutorials/${params.topic}/${e["id"]}`}>
                                <Image className="tuto-img" src={e["image"]} alt="img"  width={200} height={200}/>
                                <h2>{e["title"]}</h2>
                                <h4>{e["description"]}</h4>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    </main>
}
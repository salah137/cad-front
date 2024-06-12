"use client"

import { IoMdAdd } from "react-icons/io";
import firebase_app from "../../firebsae-config"
import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import Image from "next/image";
import { BiExit } from "react-icons/bi";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { getFirestore, getDoc, doc, collection, query, DocumentData, getDocs, setDoc } from "firebase/firestore";
import { headers } from "next/headers";

export default function page() {
    const db = getFirestore(firebase_app);

    const [add, setAdd] = useState(false)
    const [image, setImage] = useState<any>()
    const [file, setFile] = useState<any>()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [annonces, setAnnonces] = useState<any>()
    const [user, setUser] = useState<any>({})



    const getData = () => {


        (async () => {
            const queri = query(collection(db, 'annonces'),)
            const docs = await getDocs(queri)
            let ds: any[] = []
            docs.forEach(
                (e) => {
                    e.id
                    let { description, image } = e.data()
                    ds.push(
                        {
                            description, image, title: e.id
                        }
                    )
                }
            )
            console.log(ds);

            setAnnonces(ds)
        })()
    }

    useEffect(() => {

        (async () => {
            const db = getFirestore(firebase_app);

            const email = localStorage.getItem("email")
            console.log(email);

            const s = await getDoc(doc(db, "users", `${email}`))
            console.log(s);

            setUser(s.data())

        })();
    }, []);

    useEffect(() => {
        getData();

    }, []);


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

    const shareAnnonce = async () => {
        if (title && description && file) {
            const url = await uploadImage()

            const res = await setDoc(doc(db, "annonces", title), {
                description,
                image: url
            })

            getData()
            setAdd(false)
        }
    }

    return <>{user && <main>
        {user["type"] && !add ?
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

                    <input type="text" placeholder="annonce title" onChange={
                        (e) => {
                            setTitle(e.target.value)
                        }
                    }></input>

                    <textarea className="desc" placeholder="annonce discription" onChange={
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
                        () => {
                            shareAnnonce()
                        }
                    }>
                        <IoMdAdd />

                    </button>
                </div>
                : <></>
        }

        <div className="anns" style={
            {
                display: add ? "none" : "block",

            }
        }>
            {annonces &&
                annonces.map(
                    (e: any) => {
                        return <div className="annonce-item">
                            <h1>{e["title"]} c </h1>
                            <p>{e["description"]}</p>
                            <Image src={e["image"]} alt="ann-img" width={600} height={350} className="ann-img" />
                        </div>

                    }
                )
            }</div>
    </main>}</>
}

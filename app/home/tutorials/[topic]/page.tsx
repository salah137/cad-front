"use client"
import { useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/app/firebsae-config";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { query, collection, getDocs, getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

export default function page() {
    const params = useParams<{ topic: string }>()

    const db = getFirestore(firebase_app)

    const [add, setAdd] = useState(false)
    const [image, setImage] = useState<any>()
    const [file, setFile] = useState<any>()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [user,setUser]=useState<any>()
    const [tutorials, setTutorials] = useState<any>()


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
            getTutorial();
        
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

    const createTutotial = async () => {
        if (title && description && file) {
            console.log(params.topic);
            
            const image = await uploadImage()
            const res = await setDoc(doc(db, `${params.topic}`, title), {
                description,
                image
            })


        }
    }

    const getTutorial = () => {
        (async () => {
            const queri = query(collection(db, `${params.topic}`),)
            const docs = await getDocs(queri)
            let ds: any[] = []
            docs.forEach(
                (e) => {
                    e.id
                    let { description, image, } = e.data()
                    ds.push(
                        {
                            description, image, title: e.id
                        }
                    )
                }
            )
            console.log(ds);

            setTutorials(ds)
        })()

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
                    {tutorials.map((e:any) => {
                        return (
                            <Link className="tuto" href={`/home/tutorials/${params.topic}/${e["title"]}`}>
                                <Image className="tuto-img" src={e["image"]} alt="img" width={200} height={200} />
                                <h2>{e["title"]}</h2>
                                <h4>{e["description"]}</h4>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    </main>}</>
}
"use client"

import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import Image from "next/image"
import { FaFilePdf, FaFileUpload, FaRegFileVideo } from "react-icons/fa"
import { BiExit } from "react-icons/bi"
import firebase_app from "@/app/firebsae-config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { MdOutlineMusicVideo } from "react-icons/md"
import { PiFilePdfBold } from "react-icons/pi"
import ReactPlayer from "react-player"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Link from "next/link"

import { useParams } from "next/navigation"

export default function page() {
    const params = useParams<{ topic: string, tutorialId: string }>()

    const [add, setAdd] = useState(false)
    const [image, setImage] = useState<any>()
    const [file, setFile] = useState<any>()

    const [vids, setVid] = useState<any>()
    const [vidsFile, setVidFile] = useState<any>()

    const [pdfs, setPdfs] = useState<any>()

    const [items, setItems] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [pub, setPub] = useState(false)

    const [userType, setUserType] = useState<any>()

    const [id, setId] = useState<any>()
    const [token, setToken] = useState<any>()


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

    const uploadvideo = async () => {
        const metadata = {
            // Use underscores or camelCase
            contentType: 'video/mp4',
            custom_key: 'some value',  // Using underscores
            customKeyValue: 'some value', // Using camelCase
        };

        const storage = getStorage(firebase_app)
        const fileRef = ref(storage, `videos/${title}`)
        await uploadBytes(fileRef, vids, metadata)
        return (await getDownloadURL(fileRef));
    }


    const uploadDocs = async () => {
        const storage = getStorage(firebase_app)
        const fileRef = ref(storage, `docs/${title}`)
        uploadBytes(fileRef, pdfs)
        await uploadBytes(fileRef, pdfs)
        return (await getDownloadURL(fileRef));
    }

    const getItems = () => {
        (async () => {


            const url = `${process.env.NEXT_PUBLIC_URL}/tutorial/getTutorial?id=${Number(params.tutorialId)}`;

            const data = await fetch(
                url, {
                headers: headers,
                method: "GET",

            }
            )
            let ddd = (await data.json());
            console.log(ddd);

            setItems(ddd)
        })()
    }

    useEffect(
        () => {
            if (typeof window !== 'undefined') {
                setUserType(localStorage.getItem('type'));
                setId(Number(localStorage.getItem("id")))
                setToken(localStorage.getItem("token"))
            }

            getItems()
        }, []
    )


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

                    <div className="select-img" id="img-up" onClick={
                        () => {
                            let element: HTMLElement = document.querySelector("#file-upload") as HTMLElement;
                            element.click()
                        }
                    }>
                        <input type="file" accept="image/*" id="file-upload" hidden onChange={
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
                    <div className="select-img" id="vid-up" onClick={
                        () => {
                            let element: HTMLElement = document.querySelector("#file-upload-vid") as HTMLElement;
                            element.click()
                        }
                    }>
                        <input type="file" id="file-upload-vid" hidden onChange={
                            ({
                                target: { files }
                            }) => {

                                files![0] && setVid(files![0])
                                if (files![0]) {
                                    setVidFile(URL.createObjectURL(files![0]))
                                    //setToshare(files![0].stream)
                                }

                            }
                        } />
                        {vidsFile ? <> <ReactPlayer
                            width="500px"
                            height="20vh"
                            url={vidsFile}
                            controls={true}
                            // light is usefull incase of dark mode
                            light={false}
                            // picture in picture
                            pip={true}
                        />
                            <source src={vidsFile} type="video/mp4" /></>
                            : <MdOutlineMusicVideo />}

                    </div>

                    <div className="select-img" id="file-up" onClick={
                        () => {
                            //#file-upload-pdf
                            let element: HTMLElement = document.querySelector("#file-upload-pdf") as HTMLElement;
                            element.click()
                        }
                    }>
                        <input type="file" accept="application/pdf" id="file-upload-pdf" hidden onChange={
                            ({
                                target: { files }
                            }) => {

                                setPdfs(files![0])
                                console.log(pdfs);

                            }
                        } />
                        {pdfs ? <div className="show-pdf">
                            <FaFilePdf />
                            <p>{pdfs.name}</p>
                        </div> : <PiFilePdfBold />
                        }
                    </div>


                    <button onClick={
                        async () => {
                            if (!pub) {
                                setPub(true)
                                console.log("Hi");
                                const img = await uploadImage()
                                const vid = await uploadvideo()
                                const pdf = await uploadDocs()

                                await fetch(`${process.env.NEXT_PUBLIC_URL}/tutorial/addTutorialElement`,
                                    {
                                        method: "POST",
                                        headers,
                                        body: JSON.stringify(
                                            {
                                                "tutorialId": Number(params.tutorialId),
                                                "title": title,
                                                "description": description,
                                                "image": img,
                                                "video": vid,
                                                "files": pdf
                                            }
                                        )
                                    }
                                )
                                getItems()
                                setPub(false)
                                setAdd(false)
                            }
                        }
                    }>
                        {pub ? <AiOutlineLoading3Quarters /> : <IoMdAdd />}

                    </button>
                </div>
                : <></>
        }
        {
            (items && !add) && <div className="tuto-items-list">
                {
                    items.map(
                        (e) => {
                            return <Link className="tuto-item" href={`/home/tutorials/${params.topic}/${params.tutorialId}/${e["id"]}`}>
                                <Image src={e["image"]} alt="dd" height={200}
                                    width={200} />
                                <h2>{e["title"]}</h2>
                            </Link>
                        }
                    )
                }
            </div>
        }
    </main>
}
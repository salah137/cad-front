"use client"

import { useEffect, useState } from "react"
import { FaFilePdf } from "react-icons/fa6"
import ReactPlayer from "react-player"
import Image from "next/image"
import { useParams } from "next/navigation"
import firebase_app from "@/app/firebsae-config"
import { getFirestore, getDoc, doc, collection, getDocs, query } from "firebase/firestore"

export default function page() {
    const params = useParams<{ topic: string, tutorialId: string, item: string }>()
    const [iteme, setIteme] = useState<any>()
    const [user, setUser] = useState<any>()
    const db = getFirestore(firebase_app)





    useEffect(() => {
        (async () => {
            const docs = await getDoc(doc(db, `${params.topic}/${params.tutorialId}/videos/${params.item}`))

            setIteme(docs.data())
        })()

    }, []);
    return <main>
        {
            iteme && <div className="watching">
                <div className="vidd">
                    <ReactPlayer
                        width="80vw"
                        height="50vh"
                        url={iteme["video"]}
                        controls={true}
                        light={false}
                        pip={true}
                    />
                    <h1>{iteme["title"]}</h1>
                    <div className="files">
                        {iteme["pdf"] &&
                        <a href={iteme["pdf"]} target="_blank" rel="noopener noreferrer">
                            <div className="pdf">
                                <FaFilePdf />
                                <h3>Check our docs</h3>
                            </div>
                        </a>}

                        <div className="text">
                            <h1>{params.item}</h1>
                            {iteme["description"]}
                        </div>
                    </div>
                </div>
            </div>
        }
    </main>
}
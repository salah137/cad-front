"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaFilePdf } from "react-icons/fa6"
import ReactPlayer from "react-player"
import Image from "next/image"

export default function page() {
    const params = useParams<{ topic: string, tutorialId: string, item: string }>()
    const [iteme, setIteme] = useState<any>()
    const token = localStorage.getItem("token")

    let headers = {
        Accept: "application/json", // Example header
        "Content-Type": "application/json",
        'Authorization': `${token}`
    };

    useEffect(
        () => {
            (
                async () => {
                    let res = await fetch(`${process.env.NEXT_PUBLIC_URL}/tutorial/getTutorialElement?id=${params.item}`, {
                        method: "GET",
                        headers
                    })
                    let data = await res.json()
                    console.log(data);
                    setIteme(data)
                }
            )()
        }, []
    )

    return <main>
        {
            iteme && <div className="watching">
                <div className="vidd">
                    <ReactPlayer
                        width="80vw"
                        height="50vh"
                        url={iteme["video"]}
                        controls={true}
                        // light is usefull incase of dark mode
                        light={false}
                        // picture in picture
                        pip={true}
                    />
                        <h1>{iteme["title"]}</h1>
                    <div className="files">
                        
                        <div className="pdf">
                            <FaFilePdf />
                            <h3>Check our docs</h3>
                        </div>

                        <div className="img">
                            <Image src={iteme["image"]} alt={""} width={300} height={300}/>
                        </div>
                    </div>
                </div>
            </div>
        }
    </main>
}
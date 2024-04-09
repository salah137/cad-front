"use client"

import { IoMdAdd } from "react-icons/io";
import firebase_app from "../../firebsae-config"
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import Image from "next/image";
import { BiExit } from "react-icons/bi";

export default function page() {
    const [add, setAdd] = useState(false)
    const [image, setImage] = useState("")
    const [file,setFile] = useState<any>()
    const userType = localStorage.getItem('type');
    const userTypeNumber = userType ? parseInt(userType) : null;



    return <main>
        {userTypeNumber == 1 ?
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
                        ()=>{
                            setFile(null)
                            setImage('')
                            setAdd(false)
                        }
                    }/>
                    <input type="text" placeholder="annonce title"></input>
                    <textarea className="desc" placeholder="annonce discription"></textarea>
                    <div className="select-img" onClick={
                        ()=>{
                            document.querySelector("#file-upload")!.click()
                        }
                    }>
                        <input type="file" accept="image/*" id = "file-upload" hidden  onChange={
                            ({
                                target : {files}
                            })=> {
                                files![0] &&  setImage(files![0].name)
                                if (files![0]){
                                    setFile(URL.createObjectURL(files![0]))
                                }
                            }
                        }/>
                       {file?<Image src = {file} alt = "" width={100} height={100} className="img-ann"/>: <FaFileUpload />}
                    </div>

                    <button>
                        <IoMdAdd />

                    </button>
                </div>
                : <></>
        }
    </main>
}

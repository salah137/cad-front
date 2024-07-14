"use client"

import Image from 'next/image'
import Link from 'next/link'
import design from "../../assets/images/design.jpeg"
import art from "../../assets/images/art.jpeg"

export default function page() {
    return <main className='tutorials'>
        <div className="chose-tuto">
            <Link href={"/home/tutorials/design"} className='tut-elem-design'>
                <Image src={design} alt="logo" className='logo-tuto' />
                <h3>Designe</h3>
            </Link>

            <Link href={"/home/tutorials/art"} className='tut-elem-art'>
                <Image src={art} alt="logo" className='logo-tuto' />
                <h3>Art</h3>
            </Link>

        </div>
    </main>
}


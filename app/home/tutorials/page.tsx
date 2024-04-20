import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Image from 'next/image'
import logo from "../../assets/images/cad-logo.png"
import Link from 'next/link'
export default function page() {
    return <main className='tutorials'>
        <div className="chose-tuto">
            <Link href={"/home/tutorials/design"} className='tut-elem-design'>
                <Image src={logo} alt="logo" className='logo-tuto' />
                <h3>Designe</h3>
            </Link>

            <Link href={"/home/tutorials/art"} className='tut-elem-art'>
                <Image src={logo} alt="logo" className='logo-tuto' />
                <h3>Art</h3>
            </Link>

        </div>
    </main>
}


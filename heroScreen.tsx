import Link from "next/link";
import Image from "next/image";
import logo from "./assets/logo.png"
import i1 from './assets/hero/1.jpeg'
import i2 from './assets/hero/2.jpeg'
import i3 from './assets/hero/3.jpeg'
import i4 from './assets/hero/4.jpeg'
import i5 from './assets/hero/5.jpeg'
import insta from "./assets/logos/insta.png"
import face from "./assets/logos/face.png"

export function HeroScreen() {
    return <>
        <header>
            <Image src={logo} width={200} height={200} alt="logo" />
            <div className="buttons">
                <Link href={"/signup"}><div className="--up">Sign Up</div></Link>
                <Link href={"/signin"}> <div className="--in">Sign In</div></Link>
            </div>
        </header>
        <main>
            <h2>
                Préparez-vous
            </h2>
            <p> Préparez-vous aux concours des grandes écoles (ENSA, ENSAM, ENAM, médecine...) à un prix avantageux. Pour seulement 200 DH, vous pouvez acquérir les connaissances nécessaires pour réussir le concours avec succès.</p>
            <Link href={"/signup"}><div className="--up">start</div></Link>



            <div className="hero">
                <Image src={i1} alt="img" className="img" id="i1" />
                <Image src={i2} alt="img" className="img" id="i2" />
                <Image src={i3} alt="img" className="img" id="i3" />
                <Image src={i4} alt="img" className="img" id="i4" />
                <Image src={i5} alt="img" className="img" id="i5" />
            </div>
        </main>
        <footer>
            <h1>Contacte Us : </h1>
            <div className="contact">
                <div className="infos">
                    <h2>0614107997</h2>
                    <h2 className="email">boukairsalah@gmail.com</h2>
                </div>

                <div className="social">
                   <a href="https://www.instagram.com/najahsup24/" target="_blank"><Image src={insta} alt="insta" className="sc" /></a> 
                    <a href="https://www.facebook.com/profile.php?id=61561198843147" target="_blank"><Image src={face} alt="face" className="sc" /></a>

                </div>
            </div>
        </footer>
    </>
}



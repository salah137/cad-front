
"use client"
import { Inter } from "next/font/google";
import "./style.css";
import { SiCoursera } from "react-icons/si";
import { BiNews } from "react-icons/bi";
import { useRouter } from "next/navigation"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <div className="main">
          <div className="nav">
            <div onClick={
              ()=>{
                router.push("/home/tutorials")
              }
            }>
              <SiCoursera />
              <h2>Tutorials</h2>
            </div>

            <div onClick={
                       ()=>{
                        router.push("/home/annonces")
                      }
            }>
              <BiNews />
              <h2>News</h2>
            </div>
            
            <div onClick={
              localStorage.removeItem()
                       ()=>{
                        localStorage.removeItem("email")
                        router.push("/")
                      }
            }>
              <BiNews />
              <h2>Log Out</h2>
            </div>
            
          </div>
          {children}

        </div>
      </body>
    </html>
  );
}

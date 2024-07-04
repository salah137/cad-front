
"use client"
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { SiCoursera } from "react-icons/si";
import { BiNews } from "react-icons/bi";
import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className={`main ${inter.className}`}>
      <div className="nav">
        <div className="btns-nav"
          onClick={() => {
            router.push("/home/tutorials");
          }}
        >
          <SiCoursera />
          <h2>Tutorials</h2>
        </div>

        <div className="btns-nav"
          onClick={() => {
            router.push("/home/annonces");
          }}
        >
          <BiNews />
          <h2>News</h2>
        </div>
        
        <div className="sep">
        </div>
        
        <div className="btns-nav"
          onClick={() => {
            localStorage.removeItem("email");
            router.push("/");
          }}
        >
          <h2>Log Out</h2>
        </div>
      </div>
      {children}
    </div>
  );
}

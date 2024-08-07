import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
//import "../styles/title.css";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HostingPlus Knowledge Base",
  description: "Base de conocimiento para soporte técnico hostingplus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex-auto justify-center items-center text-center pb-12">
          <div className="flex-auto justify-center items-center md:flex-auto">
            <Image
              className="max-w-full h-auto"
              src="/images/hplus-logo.png"
              alt="Hplus Logo"
              width={400}
              height={100}
            />
            <div className=""><title className="text-4xl">Knowledge Base</title></div>
            
          </div>
        </header>
        <Navbar />
        <div className="h-auto container mx-auto border-r-cyan-200 shadow-cust-xl rounded-md px-8 pt-6 pb-4 flex-col ">{children}</div>
      </body>
    </html>
  );
}

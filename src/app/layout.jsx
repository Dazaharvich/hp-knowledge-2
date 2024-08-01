import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
//import "../styles/title.css";


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
        <h1>Navbar</h1>
        <div className="h-[calc(100vh-5rem)] container mx-auto">{children}</div>
      </body>
    </html>
  );
}

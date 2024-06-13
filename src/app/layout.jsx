import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HostingPlus Knowledge Base",
  description: "Base de conocimiento para soporte técnico hostingplus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex-auto justify-center items-center text-center">
          <div className="flex-auto justify-center items-center md:flex-auto">
            <Image
              className="max-w-full h-auto"
              src="/images/hplus-logo.png"
              alt="Hplus Logo"
              width={500}
              height={200}
            />
            <h1 className="text-5xl">Knowledge Base</h1>
          </div>
          <h1>Navbar</h1>
        </header>

        
        <div className="h-[calc(100vh-5rem)]">{children}</div>
      </body>
    </html>
  );
}

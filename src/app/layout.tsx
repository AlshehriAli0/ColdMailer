import "@/styles/globals.css";
import { GiIceCube } from "react-icons/gi";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ColdMailer",
  description: "Send bulk emails with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
          <link rel="icon" href="coldMailerIcon.png" />
          <meta charSet="utf-8" />
        <body className={`bg-slate-950 font-sans ${inter.variable} h-[4000px]`}>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

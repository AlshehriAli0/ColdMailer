import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "ColdMailer",
  description: "Send bulk emails with ease",
};

export default function RootLayout({
  children, pageProps
}: {
  children: React.ReactNode;
  pageProps: AppProps;
}) {
  return (
    <ClerkProvider
      {...pageProps}
      
    >
      <html lang="en">
        <link rel="icon" href="coldMailerIcon.png" />
        <meta charSet="utf-8" />
        <body
          className={`bg-slate-950 font-sans ${inter.className} h-[4000px]`}
        >
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

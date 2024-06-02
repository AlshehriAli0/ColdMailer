import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Footer from "@/components/footer";
import SideBar from "@/components/sidebar";
import RecoilContextProvider from "@/context/recoilContextProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Cold Mailer | Cold Mailing Tool ",
  description: "Send bulk or cold emails with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  pageProps: AppProps;
}) {
  return (
    <ClerkProvider>
      <RecoilContextProvider>
        <html lang="en" className="!scroll-smooth">
          <head>
            <ColorSchemeScript />
            <link rel="icon" href="https://utfs.io/f/6cca6f67-3c72-4be5-8e4e-2ffa4723607b-vxyxxd.png" />
            <meta charSet="utf-8" />
          </head>

          <body className={`bg-slate-950 font-sans ${inter.className}`}>
            <Toaster />

            <MantineProvider>
              <SideBar />
              <Navbar />
              {children}
              <Footer />
            </MantineProvider>
          </body>
        </html>
      </RecoilContextProvider>
    </ClerkProvider>
  );
}

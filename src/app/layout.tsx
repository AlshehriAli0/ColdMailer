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
    <ClerkProvider >
      <html lang="en" className="!scroll-smooth">
        <head>
          <ColorSchemeScript />
          <link rel="icon" href="coldMailerIcon.png" />
          <meta charSet="utf-8" />
        </head>

        <body className={`bg-slate-950 font-sans ${inter.className}`}>
          <MantineProvider>
            <SideBar />
            <Navbar />
            {children}
            <Footer />
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

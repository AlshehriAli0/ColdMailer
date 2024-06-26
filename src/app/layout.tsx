import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import dynamicImport from "next/dynamic";
import RecoilContextProvider from "@/context/recoilContextProvider";

const Footer = dynamicImport(() => import("@/components/footer"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Cold Mailer | Cold Mailing Tool ",
  description: "Sending many emails was never easier than now",
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
            <link
              rel="icon"
              href="https://utfs.io/f/6cca6f67-3c72-4be5-8e4e-2ffa4723607b-vxyxxd.png"
            />
            <meta charSet="utf-8" />
          </head>

          <body className={`bg-slate-950 font-sans ${inter.className}`}>
            <Toaster />
            <MantineProvider>
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

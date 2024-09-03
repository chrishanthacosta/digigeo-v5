import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClientComponent from "./layout-client";
import HomeNavbar from "./components/nav-bar/navbar-component";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TNM Maps Staging",
  description: "Digigeodata",
  // icons: {
  //   icon: "/favicon.ico", // /public path
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TNM Maps Staging</title>
        <meta name="description" content="Digigeodata" />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MWTV2JLXR0"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MWTV2JLXR0');
            `}
        </Script>
        {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-MWTV2JLXR0"
            ></script> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MWTV2JLXR0');
            `,
          }}
        /> */}
      </head>
      <body className={`${inter.className} overflow-hidden h-screen`}>
        {/* <body className={inter.className}> */}

        <LayoutClientComponent>
          <HomeNavbar />
          {children}
        </LayoutClientComponent>
      </body>
    </html>
  );
}

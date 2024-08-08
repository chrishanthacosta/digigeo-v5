import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClientComponent from "./layout-client";
import HomeNavbar from "./components/nav-bar/navbar-component";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TNM Maps",
  description: "Digigeodata",
  // icons: {
  //   icon: "/favicon.ico", // /public path
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MWTV2JLXR0"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MWTV2JLXR0');
            `,
          }}
        />
      </Head>
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

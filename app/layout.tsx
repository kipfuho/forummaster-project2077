import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/navbar/NavBar";
import Footer from "./components/layout/footer/Footer";
import ContextProvider from "./components/context/ContextProvider";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

const inter = Inter({ subsets: ["latin"] });

/**
 * Root Layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          <ContextProvider>
            <NavBar/>
              <main>
                {children}
              </main>
            <Footer/>
          </ContextProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}

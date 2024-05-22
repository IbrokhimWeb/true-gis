"use client";

import "./globals.css";
import { store } from "@/store";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <main className="container w-full h-screen max-sm:px-5">
              <header className="w-full h-[10vh] sticky top-0 backdrop-blur-md">
                <Header />
              </header>
              <section className="w-full h-auto px-52 py-10 max-lg:px-0">
                {children}
              </section>
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;

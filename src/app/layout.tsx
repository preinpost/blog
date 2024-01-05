import {Inter} from 'next/font/google'
import 'github-markdown-css'
import './globals.css'
import Header from "@/app/client/Header";
import GoogleAnalytics from "@/app/client/GoogleAnalytics";

const inter = Inter({subsets: ['latin']})


export const metadata = {
  title: 'preinpost log',
  description: 'blog',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="markdown-body">
    <GoogleAnalytics/>
    <body className={`${inter.className} flex flex-col`}>
    <div className="flex flex-col my-4 w-full h-auto self-center md:my-8 md:w-11/12">
      <Header/>
      {children}
    </div>
    </body>
    </html>
  )
}

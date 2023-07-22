import {Inter} from 'next/font/google'
import 'github-markdown-css'
import './globals.css'
import Header from "@/app/client/Header";

const inter = Inter({subsets: ['latin']})


export const metadata = {
  title: 'preinpost log',
  description: 'blog',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="markdown-body">
    <body className={`${inter.className} flex flex-col`}>
    <div className="flex flex-col my-4 lg:my-8 lg:w-11/12 w-full h-auto self-center">
      <Header/>
      {children}
    </div>
    </body>
    </html>
  )
}

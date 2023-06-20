import {Inter} from 'next/font/google'
import 'github-markdown-css'
import './globals.css'

const inter = Inter({subsets: ['latin']})


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="markdown-body">
    <body className={`${inter.className} flex flex-col`}>
    <div className="flex flex-col my-8 w-11/12 h-auto self-center">
      <div className="flex mb-16">
        <div className="flex justify-center items-center text-3xl mx-6 h-12">preinpost log</div>
        <div className="flex ml-auto">
          <div className="flex justify-center items-center mx-6 h-12 w-28 rounded-lg border-2 border-rose-500">list
          </div>
          <div className="flex justify-center items-center mx-6 h-12 w-28 rounded-lg border-2 border-rose-500">about
          </div>
        </div>
      </div>
      {children}
    </div>
    </body>
    </html>
  )
}

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
    <body>
      <div className={`container relative mx-auto p-6 ${inter.className}`}>
        {/* Mobile Button */}
        <div id="mobile-menu" className="fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-slate-500">
            <div className="w-full py-3 text-center">
                <a href="#features" className="block hover:text-softRed">Features</a>
            </div>
            <div className="w-full py-3 text-center">
                <a href="#download" className="block hover:text-softRed">Download</a>
            </div>
            <div className="w-full py-3 text-center">
                <a href="#faq" className="block hover:text-softRed">FAQ</a>
            </div>
            <div className="w-full py-3 text-center">
                <a href="#login" className="block hover:text-softRed">Login</a>
            </div>
        </div>
        <Header/>
        {children}
      </div>
    </body>
    </html>
  )
}
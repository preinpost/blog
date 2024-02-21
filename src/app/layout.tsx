import { Inter } from 'next/font/google'
import 'github-markdown-css'
import './globals.css'
import Header from "@/app/client/Header";
import GoogleAnalytics from "@/app/client/GoogleAnalytics";
import MobileMenu from './client/MobileMenu';
import Footer from './client/Footer';

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'preinpost.in',
  description: 'blog',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="markdown-body">
      <GoogleAnalytics />
      <body className="bg-softWhite">
        <div className={`container relative mx-auto p-6 ${inter.className}`}>
          {/* Mobile Button */}
          <MobileMenu />
          <Header />
          {children}
          <Footer />
          <div id="toast-alert" className="toast toast-center toast-top z-50 hidden">
            <div className="alert alert-info">
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
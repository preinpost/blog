import type { AppProps } from "next/app";
import 'github-markdown-css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
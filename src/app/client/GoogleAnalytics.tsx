"use client"

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8QSLBCCJYZ" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          {/*@ts-ignore*/}
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-8QSLBCCJYZ');
        `}
      </Script>
    </>
  )
};
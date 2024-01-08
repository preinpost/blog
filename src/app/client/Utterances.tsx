"use client"

import { useEffect, useRef } from "react";

export default function Utterances() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'preinpost/preinpost.github.io');
    scriptElem.setAttribute('issue-term', 'pathname');
    scriptElem.setAttribute('theme', `github-light`);
    scriptElem.crossOrigin = 'anonymous';

    // if (ref.current?.firstChild !== null) {
    //   ref.current?.removeChild(ref.current.firstChild!);
    // }
    ref.current?.appendChild(scriptElem);
  }, []);

  return (
    <section className="mt-32" ref={ref}></section>
  )
}


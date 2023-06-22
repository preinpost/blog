"use client"

export default function Utterances() {
  return <section className="mt-32"
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement('script');
      scriptElem.src = 'https://utteranc.es/client.js';
      scriptElem.async = true;
      scriptElem.setAttribute('repo', 'preinpost/preinpost.github.io');
      scriptElem.setAttribute('issue-term', 'pathname');
      scriptElem.setAttribute('theme', 'github-dark');
      scriptElem.crossOrigin = 'anonymous';
      elem.appendChild(scriptElem);
    }}
  />
}
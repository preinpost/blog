"use client"

import { useCallback, useEffect, useState } from "react";

type ColorTheme = 'light' | 'dark';

interface ColorThemeChangedEvent extends CustomEvent {
  detail: {
    to: ColorTheme
  }
}

declare global {
    interface WindowEventMap {
        'colorThemeChanged': ColorThemeChangedEvent;
    }
}


export default function Utterances() {
  const[theme, setTheme] = useState('light');
  

  useEffect(() => {
    window.addEventListener('colorThemeChanged', (e: ColorThemeChangedEvent) => {
      setTheme(e.detail.to)
      console.log("to", e.detail.to);
    });

    if (localStorage.getItem('color-theme')) {
      // If light, make dark and save in localstorage
      if (localStorage.getItem('color-theme') === 'light') {
        setTheme('github-light');
      } else {
        setTheme('github-dark');
      }
    } else {
      setTheme('github-light');
    }
  }, [theme]);
  
  return utterancesSection('theme');

}

function utterancesSection(theme: string){
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
        scriptElem.setAttribute('theme', theme);
        scriptElem.crossOrigin = 'anonymous';
        elem.appendChild(scriptElem);
      }}
    />
} 
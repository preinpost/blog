"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter()

  useEffect(() => {

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon!.classList.remove('hidden')
      document.documentElement.classList.toggle('dark');
    } else {
      themeToggleDarkIcon!.classList.remove('hidden')
    }

    // Listen for toggle button click
    themeToggleBtn!.addEventListener('click', toggleMode);

    function toggleMode() {
      // Toggle icon
      themeToggleDarkIcon!.classList.toggle('hidden');
      themeToggleLightIcon!.classList.toggle('hidden');

      // If is set in localstorage
      if (localStorage.getItem('color-theme')) {
        // If light, make dark and save in localstorage
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        // If not in localstorage
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    }


  }, []);

  return (
    <div className="flex items-center justify-between space-x-20 my-6 mb-24">
        <div className="text-md text-grayishBlack font-bold dark:text-white pl-3 cursor-pointer md:text-3xl" onClick={() => {router.push("/list/1")}}>
          preinpost.log
        </div>

        <div className="flex space-x-6 pr-6">
          {/* Dark/Light Mode Button */}
          
          <button id="theme-toggle"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
              {/* Dark SVG Icon */}
              <svg
                      id="theme-toggle-dark-icon"
                      className="w-5 h-5 hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                  ></path>
              </svg>
              {/* Light SVG Icon */}
              <svg
                      id="theme-toggle-light-icon"
                      className="w-5 h-5 hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                  ></path>
              </svg>
          </button>
          <div className="hidden justify-end items-center text-xl cursor-pointer text-grayishBlack font-bold dark:text-white md:flex" onClick={() => {router.push("/about")}}>
            about
          </div>
          <button id="menu-btn" className="z-30 mt-2 block md:hidden focus:outline-none hamburger" onClick={onClickMobileMenu}>
              <span className="hamburger-top dark:bg-softWhite"></span>
              <span className="hamburger-middle dark:bg-softWhite"></span>
              <span className="hamburger-bottom dark:bg-softWhite"></span>
          </button>
        </div>
        
    </div>
  );
}

function onClickMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');

    btn!.classList.toggle('open');
    menu!.classList.toggle('flex');
    menu!.classList.toggle('hidden');

}


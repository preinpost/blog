"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter()

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, []);

  return (
    <div className="flex items-center justify-between space-x-20 my-6 mb-24">
        <div className="text-xl text-white pl-3 cursor-pointer md:text-3xl" onClick={() => {router.push("/list/1")}}>
          preinpost log
        </div>
       <div className="hidden justify-end items-center text-xl pr-6 cursor-pointer md:flex" onClick={() => {router.push("/about")}}>
          about
        </div>
      <button id="menu-btn" className="z-30 mt-2 block md:hidden focus:outline-none hamburger" onClick={onClickMobileMenu}>
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
      </button>
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


"use client"

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between space-x-20 my-6 mb-24">
        <div className="text-2xl text-grayishBlack font-sans font-bold dark:text-white pl-3 cursor-pointer md:text-3xl" onClick={() => { router.push("/list/1") }}>
          preinpost.log
        </div>

        <div className="flex space-x-6 pr-6">
          {/* Dark/Light Mode Button */}

          <div className="hidden justify-end items-center text-xl cursor-pointer text-grayishBlack font-bold dark:text-white md:flex" onClick={() => { router.push("/about") }}>
            about
          </div>
        </div>
        <button id="menu-btn" className="z-30 mt-2 block md:hidden focus:outline-none hamburger" onClick={onClickMobileMenu}>
          <span className="hamburger-top bg-grayishBlack dark:bg-softWhite"></span>
          <span className="hamburger-middle bg-grayishBlack dark:bg-softWhite"></span>
          <span className="hamburger-bottom bg-grayishBlack dark:bg-softWhite"></span>
        </button>

      </div>

      {/*@ts-ignore*/}
      <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600&family=Barlow+Semi+Condensed:wght@400;500;600&family=Open+Sans:wght@400;700&family=Poppins:wght@400;500;700&family=Raleway:ital,wght@0,400;0,700;1,400&family=Rubik:wght@400;600;700&family=Ubuntu+Mono:wght@700&display=swap&Noto+Sans+KR&display=swap" rel="stylesheet" />
    </>
  );
}

function onClickMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn!.classList.toggle('open');
  menu!.classList.toggle('flex');
  menu!.classList.toggle('hidden');
}

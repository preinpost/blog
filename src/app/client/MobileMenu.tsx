"use client";

import { useRouter } from "next/navigation";

export default function MobileMenu() {
  const router = useRouter()

  return (
    <div id="mobile-menu" className="fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest font-bold text-grayishBlack uppercase divide-y bg-neutral-400 opacity-95">
      <div className="w-full py-3 text-center cursor-pointer" onClick={() => { closeMobileMenu(); router.push("/about"); }}>
        About
      </div>
    </div>
  )
}

function closeMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn!.classList.remove('open');
  menu!.classList.add('hidden');
  menu!.classList.remove('flex');
}

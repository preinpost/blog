"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter()

  return (
    <div className="flex mb-12 md:mb-36">
      <div className="flex justify-center items-center mx-6 h-12">
        <div className="text-xl text-white cursor-pointer md:text-3xl" onClick={() => {router.push("/list/1")}}>
          preinpost log
        </div>
      </div>
      <div className="flex ml-auto">
        <div className="text-xl flex justify-end items-center mx-6 h-12 w-28 cursor-pointer" onClick={() => {router.push("/about")}}>
          about
        </div>
      </div>
    </div>
  );
}


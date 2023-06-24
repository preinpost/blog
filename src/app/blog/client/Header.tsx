"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter()

  return (
    <div className="flex mb-36">
      <div className="flex justify-center items-center mx-6 h-12">
        <div className="text-3xl 2xs:text-xl text-white cursor-pointer" onClick={() => {router.push("/blog/list/1")}}>
          preinpost log
        </div>
      </div>
      <div className="flex ml-auto">
        <div className="text-xl flex justify-center items-center mx-6 h-12 w-28">
          about
        </div>
      </div>
    </div>
  );
}


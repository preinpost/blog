"use client"

import Tag from "@/app/blog/client/Tag";
import {useRouter} from "next/navigation";
import ContentArea from "@/app/blog/client/ContentArea";

export default function ListPage({item}: { item: string }) {
  const router = useRouter()

  let parsedItem: ArticleInfo = JSON.parse(item);

  return (
    <ContentArea>
      <div
        className="cursor-pointer p-6 my-3 flex flex-col rounded-lg bg-indigo-950 bg-opacity-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
        onClick={() => router.push(`/blog/detail/${parsedItem.id}`)}
      >
        <div className="flex">
          <div className="mr-5 text-xl">{parsedItem.meta?.title}</div>
        </div>

        <div className="flex">
          <div className="ml-1">{parsedItem.meta?.date}</div>
          <div className="flex ml-auto">
            {parsedItem.meta?.tag.map((tag) => <Tag key={parsedItem.id + tag} tagName={tag}/>)}
          </div>
        </div>
      </div>
    </ContentArea>

  )
}

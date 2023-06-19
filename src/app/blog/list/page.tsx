import {readArticleInfo} from "@/app/api/route";
import Link from "next/link";

export default function page() {
  const articleList = readArticleInfo()
  console.log(articleList)

  return (
    <>
      {articleList.map((item) =>
        <div key={item.id}>
          <Link href={`/blog/detail/${item.id}`}>
            {item.id}
          </Link>
        </div>
      )}
    </>
  )
};

function onClickItem() {

}
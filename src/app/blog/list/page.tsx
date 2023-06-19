import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";

export default function page() {
  const articleList = readArticleInfo()
  console.log(articleList)

  return (
    <>
      <div className="flex flex-col">
        <div>
          {articleList.map((item) =>
            <div key={item.id}>
              <Link href={`/blog/detail/${item.id}`}>
                {item.id}
              </Link>
            </div>
          )}
        </div>

      </div>

    </>
  )
};

function onClickItem() {

}
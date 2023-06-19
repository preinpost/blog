import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";

export default function page() {
  const articleList = readArticleInfo()
  console.log(articleList)

  return (
    <>
      <div className="container mx-lg">
        <div className={"flex-col justify-center"}>
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
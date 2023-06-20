import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";

export default function page() {
  const articleList = readArticleInfo();
  console.log(articleList);

  return (
    <>
      <div className="flex flex-col">
        <div>
          {articleList.map((item) =>
            <Link
              key={item.id}
              href={`/blog/detail/${item.id}`}
              className="hover:no-underline"
              style={{textDecoration:"none"}}
            >
              <div className="p-5 my-10 border-2 rounded-xl border-rose-500 text-white" key={item.id}>
                {item.meta?.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
};

// function onClickItem(id: string) {
//   router.push(`/blog/detail/${id}`);
// }
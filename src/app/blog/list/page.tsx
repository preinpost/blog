import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";

export default function page() {
  const articleList = readArticleInfo();
  console.log(articleList);

  return (
    <>
      <div className="flex flex-col items-center">
          {articleList.map((item) =>
            <Link
              key={item.id}
              href={`/blog/detail/${item.id}`}
              className="hover:no-underline w-2/3"
              style={{textDecoration:"none"}}
            >
              <div className="p-5 my-3 border-2 rounded-xl border-sky-400 text-white shadow-lg shadow-indigo-500/50" key={item.id}>
                <div className="flex">
                  <div className="mr-5 text-xl">{item.meta?.title}</div>

                </div>

                <div className="flex">
                  <div className="ml-1">{item.meta?.date}</div>
                  <div className="flex ml-auto">
                    tag: {item.meta?.tag.map((tag) => <div key={item.id + tag} className="mx-1">{tag}</div>)}
                  </div>
                </div>
              </div>
            </Link>
          )}
      </div>
    </>
  )
};

// function onClickItem(id: string) {
//   router.push(`/blog/detail/${id}`);
// }
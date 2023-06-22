import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";
import PageNavigation from "@/app/blog/client/PageNavigation";

export default function page({params}: PageProps) {
  const articleList = readArticleInfo();
  const currentPage = parseInt(params.id);

  const offset = 10

  const startItem = (currentPage - 1) * offset;
  const endItem = startItem + offset;

  return (
    <>
      <div className="flex flex-col items-center">
        {articleList
          .sort(function (a, b) {
            return new Date(b.meta!.date).getTime() - new Date(a.meta!.date).getTime()
          })
          .slice(startItem, endItem)
          .map((item) =>
            <Link
              key={item.id}
              href={`/blog/detail/${item.id}`}
              className="hover:no-underline w-2/3"
              style={{textDecoration: "none"}}
            >
              <div className="p-5 my-3 border-2 rounded-xl border-sky-400 text-white shadow-lg shadow-indigo-500/50"
                   key={item.id}>
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
      <PageNavigation totalCount={articleList.length} offset={offset} currentPage={parseInt(params.id)}/>
    </>
  );
};


export async function generateStaticParams() {
  const fs = require('fs');
  const publicPath = "public/article";

  const articleIdObject = fs.readdirSync(publicPath)
    .filter((l: string) => !l.startsWith("."))
    .map((l: string) => l
    );

  const totalPage = Math.floor(articleIdObject.length / 10) + 1;

  return Array(totalPage).keys();
}


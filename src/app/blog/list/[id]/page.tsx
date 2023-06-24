import {readArticleInfo} from "@/lib/utils";
import Link from "next/link";
import PageNavigation from "@/app/blog/client/PageNavigation";
import {range} from "@/lib/fp";
import Tag from "@/app/blog/client/Tag";
import ListPage from "@/app/blog/client/ListPage";

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
            <ListPage key={'list' + item.id} item={JSON.stringify(item)} />
          )}
      </div>
      <PageNavigation totalCount={articleList.length} offset={offset} currentPage={parseInt(params.id)}/>
    </>
  );
};


export async function generateStaticParams(): Promise<PageId[]> {
  const fs = require('fs');
  const publicPath = "public/article";

  const articleIdObject = fs.readdirSync(publicPath)
    .filter((l: string) => !l.startsWith("."))
    .map((l: string) => l
    );

  const totalPage = Math.floor(articleIdObject.length / 10) + 1;

  return range(1, totalPage + 1).map(l => {
    return {
      id: String(l)
    }
  });
}


import { readArticleInfo } from "@/lib/utils";
import PageNavigation from "@/app/client/PageNavigation";
import { range } from "@/lib/fp";
import ListPage from "@/app/client/ListPage";

export default function page({ params }: PageProps) {
  const articleList = readArticleInfo();
  const currentPage = parseInt(params.id);

  const offset = 10

  const startItem = (currentPage - 1) * offset;
  const endItem = startItem + offset;

  return (
    <>
      {articleList
        .sort(function (a, b) {
          return new Date(b.meta!.date).getTime() - new Date(a.meta!.date).getTime()
        })
        .slice(startItem, endItem)
        .map((item) =>
          <ListPage key={'list' + item.id} item={JSON.stringify(item)} />
        )}
      <PageNavigation totalCount={articleList.length} offset={offset} currentPage={parseInt(params.id)} />
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


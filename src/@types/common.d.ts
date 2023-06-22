type PageId = {
  id: string;
};

type PageProps = {
  params: PageId;
};

type ArticleInfo = {
  id: string,
  meta?: ArticleMeta
}

type ArticleMeta = {
  title: string;
  tag: string[];
  date: string;
};

type ArticleDetail = {
  html: string,
  meta?: ArticleMeta
}
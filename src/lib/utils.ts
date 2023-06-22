import fs from "fs";

/**
 * public/article 아래의 directory list를 가져오는 함수
 */
export function readArticleInfo(): ArticleInfo[] {
  const fs = require('fs');
  const publicPath = "public/article";
  const toml = require('toml');

  return fs.readdirSync(publicPath)
    .filter((l: string) => !l.startsWith("."))
    .map((l: string) => {
      const articlePath = publicPath + "/" + l + "/";
      const tomlFilePath = articlePath + "meta.toml";

      if (fs.existsSync(tomlFilePath)) {
        const read = fs.readFileSync(tomlFilePath, "utf-8");
        const parsed = toml.parse(read);

        return {
          id: l,
          meta: parsed
        }
      }
    });
}

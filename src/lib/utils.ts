import fs from "fs";
import {unescape} from "querystring";
import toml from "toml";

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


export function readMetaFile(id: string) {
  const publicPath = "public/article";
  const tomlFilePath = `${publicPath}/${unescape(id)}/meta.toml`;
  const read = fs.readFileSync(tomlFilePath, "utf-8");

  if (fs.existsSync(tomlFilePath)) {
    return toml.parse(read);
  } else {
    return {};
  }
}

export function isEmptyObject(param: object): boolean {
  return Object.keys(param).length === 0 && param.constructor === Object;
}
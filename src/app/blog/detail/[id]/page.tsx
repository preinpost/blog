import fsPromises from 'fs/promises';
import {unescape} from "querystring";
import axios from "axios";
import fs from "fs";
import toml from "toml";
import Utterances from "@/app/blog/client/Utterances";


export default async function DetailPage({params}: PageProps) {
  const data = await getHTML(params);

  return (
    <>
      <div className="flex flex-col w-3/4 self-center">
        <div className="text-4xl">{data.meta?.title}</div>
        <div className="mt-3 mb-1 border-b border-dashed"></div>
        <div className="mb-20 text-lg self-end">{data.meta?.date}</div>

        <div dangerouslySetInnerHTML={{__html: data.html}}></div>
      </div>

      <Utterances/>
    </>
  )
};

export async function generateStaticParams(): Promise<PageId[]> {
  const fs = require('fs');
  const publicPath = "public/article";

  const articleIdObject = fs.readdirSync(publicPath)
    .filter((l: string) => !l.startsWith("."))
    .map((l: string) => {
      return {
        id: l
      }
    });

  return [...articleIdObject]
}

async function getHTML(params: PageId): Promise<ArticleDetail> {
  const publicPath = "public/article";
  let data = await fsPromises.readFile(`${publicPath}/${unescape(params.id)}/page.md`, 'utf-8');
  const blogUrl = "https://preinpost.github.io";

  const imagePattern = /^!\[.*\)/gm;

  data = data.replace(imagePattern, function (match) {
    const innerSquarePatter = /(?<=\().+?(?=\))/;

    match = match.replace(innerSquarePatter, function (innerMatch) {
      return `${blogUrl}/article/${innerMatch}`
    });

    return match;
  });

  const url = "https://api.github.com/markdown";
  const payload = {
    text: data
  };

  const headers = {
    Accept: "application/vnd.github+json",
  };

  let html = data;

  // try {
  //     html = (await axios.post(url, payload, {headers,})).data;
  // } catch(e) {
  //     console.error(e);
  // }

  const tomlFilePath = `${publicPath}/${unescape(params.id)}/meta.toml`;

  if (fs.existsSync(tomlFilePath)) {
    const read = fs.readFileSync(tomlFilePath, "utf-8");
    const parsed = toml.parse(read);

    return {
      html: html,
      meta: parsed
    }
  }

  return {
    html,
  };
}


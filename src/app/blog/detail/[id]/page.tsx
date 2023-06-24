import fsPromises from 'fs/promises';
import {unescape} from "querystring";
import axios from "axios";
import fs from "fs";
import toml from "toml";
import Utterances from "@/app/blog/client/Utterances";
import ContentArea from "@/app/blog/client/ContentArea";
import Tag from "@/app/blog/client/Tag";

import {Metadata} from "next";
import {isEmptyObject, readMetaFile} from "@/lib/utils";


export default async function DetailPage({params}: PageProps) {
  const data = await getHTML(params);

  return (
    <ContentArea>
      <div
        className="flex flex-col rounded-lg bg-indigo-900 bg-opacity-30 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="text-lg">{data.meta?.title}</div>
        <div className="flex text-sm self-end">
          <div>{data.meta?.date}</div>
        </div>
      </div>

      <div
        className="mt-8 border border-white rounded-lg border-opacity-30 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div dangerouslySetInnerHTML={{__html: data.html}}></div>
      </div>

      <div className="mt-8 flex">
        {data.meta?.tag.map((tag) => <Tag key={tag} tagName={tag}/>)}
      </div>

      <Utterances/>
    </ContentArea>
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

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  let meta = readMetaFile(params.id);

  return {
    title: meta.title,
    description: meta.id,
  }
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

  if (process.env.NODE_ENV === 'production') {
    try {
      html = (await axios.post(url, payload, {headers,})).data;
    } catch (e) {
      console.error(e);
    }
  }

  const parsed = readMetaFile(params.id);

  if (isEmptyObject(parsed)) {
    return {
      html,
    };
  } else {
    return {
      html: html,
      meta: parsed
    }
  }
}


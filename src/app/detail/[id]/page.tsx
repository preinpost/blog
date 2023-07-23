import fsPromises from 'fs/promises';
import {unescape} from "querystring";
import axios from "axios";
import Utterances from "@/app/client/Utterances";
import ContentArea from "@/app/client/ContentArea";
import Tag from "@/app/client/Tag";

import {Metadata} from "next";
import {getArticleImageList, getTitleImagePathForClient, isEmptyObject, readMetaFile} from "@/lib/utils";
import Image from "next/image";


export default async function DetailPage({params}: PageProps) {
  const data = await getHTML(params);
  const getImage = getTitleImagePathForClient(params.id);

  return (
    <ContentArea>
      <div
        className="flex flex-col rounded-lg bg-zinc-700 bg-opacity-30 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="text-lg">{data.meta?.title}</div>
        <div className="flex text-sm self-end">
          <div>{data.meta?.date}</div>
        </div>
      </div>
      <div className="flex mt-2 justify-end flex-wrap">
        {data.meta?.tag.map((tag) => <Tag key={tag} tagName={tag}/>)}
      </div>

      {
        getImage !== "" ?
          <div
            className="flex justify-center m-16 ">
            <Image src={getImage} alt={"title-image"} width={100} height={100} className="w-3/4"/>
          </div>
          :
          <></>
      }

      <div
        className="mt-6 border border-white rounded-lg border-opacity-30 p-2 lg:p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col" dangerouslySetInnerHTML={{__html: data.html}}></div>
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

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const meta = readMetaFile(params.id);
  const blogUrl = "https://preinpost.github.io";

  return {
    title: meta.title,

    openGraph: {
      title: meta.title,
      images: `${blogUrl}${getTitleImagePathForClient(params.id)}`
    }
  }
}

async function getHTML(params: PageId): Promise<ArticleDetail> {
  const publicPath = "public/article";
  let data = await fsPromises.readFile(`${publicPath}/${unescape(params.id)}/page.md`, 'utf-8');

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

  const imageNameList = getArticleImageList(params.id);
  imageNameList.forEach((i) => {
    html = html.replaceAll(i, `/article/${params.id}/${i}`);
  })

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


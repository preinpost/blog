import fsPromises from 'fs/promises';
import {unescape} from "querystring";
import axios from "axios";

type PageId = {
  id: string;
};

type PageProps = {
  params: PageId;
};

export default async function DetailPage({params}: PageProps) {
  console.log("params = ", params)
  const html = await getHTML(params);


  return (
    <>
      <div>제목</div>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </>
  )
};


async function getHTML(params: PageId) {
  console.log("params.id = ", unescape(params.id));
  let data = await fsPromises.readFile(`public/article/${unescape(params.id)}/page.md`, 'utf-8');
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

  return html;
}


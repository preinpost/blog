import fsPromises from 'fs/promises';
import {InferGetStaticPropsType} from "next";
import axios from "axios";

export default function DetailPage({html}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  )
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  }
}

export async function getStaticProps() {
  const data = await fsPromises.readFile('public/article/1/hello.md', 'utf-8');
  const url = "https://api.github.com/markdown";
  const payload = {
    text: data
  };

  const headers = {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json",
  };

  const html = (await axios.post(url, payload, {headers,})).data

  return {
    props: {html}
  }
}


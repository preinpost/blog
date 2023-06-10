import fsPromises from 'fs/promises';
import axios from "axios";
import {unescape} from "querystring";

type PageParams = {
    id: string;
};

type PageProps = {
    params: PageParams;
};

export default async function DetailPage({params}: PageProps) {
    const html = await getHTML(params);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </>
    )
};

export async function generateStaticParams() {
    const fs = require('fs');
    const publicPath = "public/article";

    const articleIdObject = fs.readdirSync(publicPath)
        .filter((l: string) => !l.startsWith("."))
        .map((l: string) => {
            console.log("path = ", l);
            return {
                id: l
            }
        });

    return [...articleIdObject]
}

async function getHTML(params: PageParams) {
    let data = await fsPromises.readFile(`public/article/${unescape(params.id)}/hello.md`, 'utf-8');
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


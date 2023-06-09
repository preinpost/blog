import fsPromises from 'fs/promises';
import axios from "axios";

type PageParams = {
    id: string;
};

type PageProps = {
    params: PageParams;
};

export default async function DetailPage({ params }: PageProps) {
    const html = await getHTML(params);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </>
    )
};

export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }]
}

async function getHTML(params: PageParams) {
    const data = await fsPromises.readFile(`public/article/${params.id}/hello.md`, 'utf-8');
    const url = "https://api.github.com/markdown";
    const payload = {
        text: data
    };

    const headers = {
        Accept: "application/vnd.github+json",
    };

    return (await axios.post(url, payload, {headers,})).data;
}


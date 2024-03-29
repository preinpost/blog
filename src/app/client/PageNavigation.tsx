"use client"

import Link from "next/link";
import { range } from "@/lib/fp";

export default function PageNavigation({ totalCount, offset, currentPage }: {
  totalCount: number,
  offset: number,
  currentPage: number
}) {

  const pageNaviUnit = 5;
  const pageNavStart = Math.floor(currentPage / pageNaviUnit) * 5 + 1;
  const maxPage = Math.floor(totalCount / offset) + 1;

  return (
    <div className="flex items-center justify-center mt-10 px-4 py-3 sm:px-6">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {
          pageNavStart <= pageNaviUnit ?
            <div style={{ textDecoration: "none" }}
              className="cursor-not-allowed relative inline-flex items-center rounded-l-md px-2 py-2 opacity-90 bg-grayishBlack text-softWhite dark:bg-softWhite dark:text-grayishBlack ring-1 ring-inset ring-gray-300 hover:bg-zinc-500 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd" />
              </svg>
            </div>
            :
            <Link href={`/list/${pageNavStart - 1}`} style={{ textDecoration: "none" }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 opacity-90 bg-grayishBlack text-softWhite dark:bg-softWhite dark:text-grayishBlack ring-1 ring-inset ring-gray-300 hover:bg-zinc-500 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd" />
              </svg>
            </Link>
        }


        {range(pageNavStart, pageNavStart + pageNaviUnit)
          .filter(n => n <= maxPage)
          .map((n) => {
            if (currentPage === n) {
              return (
                <Link key={`navi-${n}`} href={`/list/${n}`} style={{ textDecoration: "none" }}
                  className="items-center px-4 py-2 opacity-90 text-sm font-semibold ring-1 ring-inset ring-gray-300 !bg-softWhite !text-grayishBlack dark:!bg-grayishBlack dark:!text-softWhite hover:bg-zinc-500">{n}</Link>
              );
            } else {
              return (
                <Link key={`navi-${n}`} href={`/list/${n}`} style={{ textDecoration: "none" }}
                  className="items-center px-4 py-2 opacity-90 text-sm font-semibold ring-1 ring-inset ring-gray-300 !bg-grayishBlack !text-softWhite dark:!bg-softWhite dark:!text-grayishBlack hover:bg-zinc-500">{n}</Link>
              );
            }
          })}

        {

          currentPage + pageNaviUnit >= maxPage ?
            <div style={{ textDecoration: "none" }}
              className="cursor-not-allowed relative inline-flex items-center rounded-r-md px-2 py-2 opacity-90 bg-grayishBlack text-softWhite dark:bg-softWhite dark:text-grayishBlack ring-1 ring-inset ring-gray-300 hover:bg-zinc-500 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd" />
              </svg>
            </div>
            :
            <Link href={`/list/${pageNavStart + pageNaviUnit}`} style={{ textDecoration: "none" }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 opacity-90 bg-grayishBlack text-softWhite dark:bg-softWhite dark:text-grayishBlack ring-1 ring-inset ring-gray-300 hover:bg-zinc-500 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd" />
              </svg>
            </Link>
        }
      </nav>
    </div>
  );
}


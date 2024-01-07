export default function Tag({tagName}: {tagName: string}) {
  return (
    <div
      className="mx-1.5 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 my-1 bg-grayishBlack text-softWhite dark:bg-softWhite dark:text-grayishBlack border rounded-full border-softWhite dark:border-grayishBlack flex-wrap"
    >
      {tagName}
    </div>
  )
}
export default function Tag({tagName}: {tagName: string}) {
  return (
    <div
      className="mx-1.5 text-xs inline-flex items-center font-bold leading-sm uppercase px-1 lg:px-3 py-1 my-1 bg-blue-200 text-blue-700 rounded-full flex-wrap"
    >
      {tagName}
    </div>
  )
}
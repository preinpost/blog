"use client"

export default function ContentArea({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
};
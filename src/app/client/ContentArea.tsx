"use client"

export default function ContentArea({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col w-4/5 max-w-4xl self-center">
      {children}
    </div>
  )
};
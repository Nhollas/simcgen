import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simc Generator",
  description: "Generate custom simc output for your character.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className="flex items-center justify-center">{children}</body>
    </html>
  )
}

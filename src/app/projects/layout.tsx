import { Metadata } from "next"
export const metadata:Metadata = {
  title: 'project',
  description: 'One of the projects I have worked on',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

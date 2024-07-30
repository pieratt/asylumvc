import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AsylumVC Media Library',
  description: 'Discover and share great media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">AsylumVC</Link>
            <div className="space-x-4">
              <Link href="/read" className="hover:text-gray-300">Read</Link>
              <Link href="/look" className="hover:text-gray-300">Look</Link>
              <Link href="/listen" className="hover:text-gray-300">Listen</Link>
              <Link href="/add" className="hover:text-gray-300">Add New</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
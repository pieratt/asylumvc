import Link from 'next/link'
import prisma from '../lib/prisma'

export default async function Home() {
  const mediaObjects = await prisma.mediaObject.findMany({
    take: 10,
    include: { user: true },
  })

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Welcome to AsylumVC</h1>
      <nav className="mb-8">
        <Link href="/read" className="mr-4 text-blue-500 hover:underline">📖 Read</Link>
        <Link href="/look" className="mr-4 text-blue-500 hover:underline">👀 Look</Link>
        <Link href="/listen" className="text-blue-500 hover:underline">🎧 Listen</Link>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaObjects.map((media) => (
          <div key={media.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{media.title}</h2>
            <p>Type: {media.type}</p>
            <p>Creator: {media.creator}</p>
            <p>Year: {media.year}</p>
            <p>Curator: {media.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
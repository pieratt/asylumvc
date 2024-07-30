import Link from 'next/link'
import prisma from '../../lib/prisma'

export default async function BehaviorOrUserPage({ params }: { params: { behaviorOrUsername: string } }) {
    const behaviorOrUsername = params.behaviorOrUsername;
    const isBehavior = ['read', 'look', 'listen'].includes(behaviorOrUsername);

    let mediaObjects;
    if (isBehavior) {
        mediaObjects = await prisma.mediaObject.findMany({
            where: {
                type: {
                    in: behaviorOrUsername === 'read' ? ['Book', 'Post', 'Quote', 'Tweet'] :
                        behaviorOrUsername === 'look' ? ['Art', 'Film', 'Tiktok', 'Youtube'] :
                            ['Music', 'Podcast']
                }
            },
            include: { user: true },
        });
    } else {
        mediaObjects = await prisma.mediaObject.findMany({
            where: { user: { name: behaviorOrUsername } },
            include: { user: true },
        });
    }

    const title = isBehavior ? `${behaviorOrUsername}` : `${behaviorOrUsername}'s page`;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
            {isBehavior && (
                <div className="mb-4">
                    <Link href={`/${behaviorOrUsername}/s`}><span className="mr-4">Small</span></Link>
                    <Link href={`/${behaviorOrUsername}/m`}><span className="mr-4">Medium</span></Link>
                    <Link href={`/${behaviorOrUsername}/l`}><span>Large</span></Link>
                </div>
            )}
            {!isBehavior && (
                <div className="mb-4">
                    <Link href={`/${behaviorOrUsername}/read`}><span className="mr-4">📖 Read</span></Link>
                    <Link href={`/${behaviorOrUsername}/look`}><span className="mr-4">👀 Look</span></Link>
                    <Link href={`/${behaviorOrUsername}/listen`}><span>🎧 Listen</span></Link>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaObjects.map(obj => (
                    <div key={obj.id} className="border p-4 rounded">
                        <h2 className="text-xl font-semibold">{obj.title}</h2>
                        <p>{obj.type}</p>
                        <p>Duration: {obj.duration}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
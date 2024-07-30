import Link from 'next/link'
import prisma from '../../../lib/prisma'

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

const behaviorEmoji: Record<BehaviorType, string> = {
    read: '📖',
    look: '👀',
    listen: '🎧'
};

export default async function BehaviorSizePage({
    params
}: {
    params: { behaviorOrUsername: string; behaviorOrSize: string }
}) {
    const { behaviorOrUsername, behaviorOrSize } = params;
    const isBehavior = ['read', 'look', 'listen'].includes(behaviorOrUsername);
    const isSize = ['s', 'm', 'l'].includes(behaviorOrSize);

    let username, behavior, size;

    if (isBehavior) {
        behavior = behaviorOrUsername as BehaviorType;
        size = isSize ? behaviorOrSize as SizeType : undefined;
    } else {
        username = behaviorOrUsername;
        behavior = behaviorOrSize as BehaviorType;
    }

    const mediaObjects = await prisma.mediaObject.findMany({
        where: {
            ...(username && { user: { name: username } }),
            ...(behavior && {
                type: {
                    in: behavior === 'read' ? ['Book', 'Post', 'Quote', 'Tweet'] :
                        behavior === 'look' ? ['Art', 'Film', 'Tiktok', 'Youtube'] :
                            ['Music', 'Podcast']
                }
            }),
            ...(size && {
                duration: size === 's' ? { lt: 10 } :
                    size === 'm' ? { gte: 10, lt: 30 } :
                        { gte: 30 }
            })
        },
        include: { user: true },
    });

    const title = username
        ? `${username}'s ${behaviorEmoji[behavior]} ${behavior}`
        : `${behaviorEmoji[behavior as BehaviorType]} ${behavior} ${size ? `- ${size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}` : ''}`;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
            <div className="mb-4">
                <Link href={`${username ? `/${username}` : ''}/${behavior}/s`}><span className="mr-4">Small</span></Link>
                <Link href={`${username ? `/${username}` : ''}/${behavior}/m`}><span className="mr-4">Medium</span></Link>
                <Link href={`${username ? `/${username}` : ''}/${behavior}/l`}><span>Large</span></Link>
            </div>
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
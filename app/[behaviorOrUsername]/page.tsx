import { GetServerSideProps } from 'next'
import Link from 'next/link'

type BehaviorType = 'read' | 'look' | 'listen';
type MediaObject = {
    id: string;
    title: string;
    type: string;
    duration: number;
};

interface PageProps {
    behavior?: BehaviorType;
    username?: string;
    mediaObjects: MediaObject[];
}

const behaviorEmoji: Record<BehaviorType, string> = {
    read: '📖',
    look: '👀',
    listen: '🎧'
};

export default function BehaviorOrUserPage({ behavior, username, mediaObjects }: PageProps) {
    const title = behavior ? `${behaviorEmoji[behavior]} ${behavior}` : `${username}'s page`;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
            {behavior && (
                <div className="mb-4">
                    <Link href={`/${behavior}/s`}><a className="mr-4">Small</a></Link>
                    <Link href={`/${behavior}/m`}><a className="mr-4">Medium</a></Link>
                    <Link href={`/${behavior}/l`}><a>Large</a></Link>
                </div>
            )}
            {username && (
                <div className="mb-4">
                    <Link href={`/${username}/read`}><a className="mr-4">📖 Read</a></Link>
                    <Link href={`/${username}/look`}><a className="mr-4">👀 Look</a></Link>
                    <Link href={`/${username}/listen`}><a>🎧 Listen</a></Link>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const behaviorOrUsername = context.params?.behaviorOrUsername as string;
    const isBehavior = ['read', 'look', 'listen'].includes(behaviorOrUsername);

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/media?`;
    if (isBehavior) {
        url += `behavior=${behaviorOrUsername}`;
    } else {
        url += `username=${behaviorOrUsername}`;
    }

    const res = await fetch(url);
    const mediaObjects = await res.json();

    return {
        props: {
            behavior: isBehavior ? behaviorOrUsername : undefined,
            username: isBehavior ? undefined : behaviorOrUsername,
            mediaObjects,
        },
    }
}
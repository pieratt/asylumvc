import { GetServerSideProps } from 'next'
import Link from 'next/link'

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';
type MediaObject = {
    id: string;
    title: string;
    type: string;
    duration: number;
};

interface PageProps {
    username?: string;
    behavior: BehaviorType;
    size?: SizeType;
    mediaObjects: MediaObject[];
}

const behaviorEmoji: Record<BehaviorType, string> = {
    read: '📖',
    look: '👀',
    listen: '🎧'
};

export default function BehaviorSizePage({ username, behavior, size, mediaObjects }: PageProps) {
    const title = username
        ? `${username}'s ${behaviorEmoji[behavior]} ${behavior}`
        : `${behaviorEmoji[behavior]} ${behavior} ${size ? `- ${size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}` : ''}`;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">{title}</h1>
            <div className="mb-4">
                <Link href={`${username ? `/${username}` : ''}/${behavior}/s`}><a className="mr-4">Small</a></Link>
                <Link href={`${username ? `/${username}` : ''}/${behavior}/m`}><a className="mr-4">Medium</a></Link>
                <Link href={`${username ? `/${username}` : ''}/${behavior}/l`}><a>Large</a></Link>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const behaviorOrUsername = context.params?.behaviorOrUsername as string;
    const behaviorOrSize = context.params?.behaviorOrSize as string;

    const isBehavior = ['read', 'look', 'listen'].includes(behaviorOrUsername);
    const isSize = ['s', 'm', 'l'].includes(behaviorOrSize);

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/media?`;
    if (isBehavior) {
        url += `behavior=${behaviorOrUsername}`;
        if (isSize) url += `&size=${behaviorOrSize}`;
    } else {
        url += `username=${behaviorOrUsername}&behavior=${behaviorOrSize}`;
    }

    const res = await fetch(url);
    const mediaObjects = await res.json();

    return {
        props: {
            username: isBehavior ? undefined : behaviorOrUsername,
            behavior: isBehavior ? behaviorOrUsername : behaviorOrSize,
            size: isSize ? behaviorOrSize : undefined,
            mediaObjects,
        },
    }
}
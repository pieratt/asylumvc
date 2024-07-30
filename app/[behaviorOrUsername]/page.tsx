'use client';

import { useState, useEffect } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function DynamicPage({ params }: { params: { behaviorOrUsername: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
    const [filter, setFilter] = useState<{ behavior?: BehaviorType; size?: SizeType }>({
        behavior: (searchParams.get('behavior') as BehaviorType) || undefined,
        size: (searchParams.get('size') as SizeType) || undefined,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        fetchMediaObjects();
    }, [params.behaviorOrUsername, filter]);

    useEffect(() => {
        const size = searchParams.get('size') as SizeType;
        setFilter(prev => ({ ...prev, size }));
    }, [searchParams]);

    const fetchMediaObjects = async () => {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
            ...(isUser ? { username: params.behaviorOrUsername } : { behavior: params.behaviorOrUsername }),
            ...(filter.size && { size: filter.size }),
        }).toString();
        const response = await fetch(`/api/media?${queryParams}`);
        const data = await response.json();
        setMediaObjects(data);
        setIsLoading(false);
        setIsUser(data.length > 0 && 'user' in data[0]);
    };

    const handleSizeFilter = (size: SizeType | undefined) => {
        const newFilter = { ...filter, size };
        setFilter(newFilter);
        const queryParams = new URLSearchParams(newFilter as Record<string, string>).toString();
        router.push(`/${params.behaviorOrUsername}?${queryParams}`, { scroll: false });
    };

    const resetFilters = () => {
        setFilter({});
        router.push(`/${params.behaviorOrUsername}`, { scroll: false });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">
                {isUser ? `${params.behaviorOrUsername}'s Media` : `${params.behaviorOrUsername.charAt(0).toUpperCase() + params.behaviorOrUsername.slice(1)} Media`}
            </h1>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Size Filters</h2>
                <div className="flex space-x-4">
                    {(['s', 'm', 'l'] as SizeType[]).map(size => (
                        <button
                            key={size}
                            onClick={() => handleSizeFilter(filter.size === size ? undefined : size)}
                            className={`px-4 py-2 rounded ${filter.size === size ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        >
                            {size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}
                        </button>
                    ))}
                </div>
                <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Reset Filters
                </button>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <MediaGrid mediaObjects={mediaObjects} />
            )}
        </div>
    );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams } from 'next/navigation';
import MediaGrid from '../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function MediaGridPage() {
    const router = useRouter();
    const params = useParams();
    const [mediaObjects, setMediaObjects] = useState<MediaObjectWithUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType | null>(null);
    const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);

    const fetchMediaObjects = useCallback(async () => {
        const response = await fetch('/api/media');
        const data: MediaObjectWithUser[] = await response.json();
        setMediaObjects(data);
    }, []);

    useEffect(() => {
        fetchMediaObjects();
    }, [fetchMediaObjects]);

    useEffect(() => {
        const segments = (params.slug as string[] | undefined) || [];
        if (segments.length > 0) {
            if (['read', 'look', 'listen'].includes(segments[0])) {
                setSelectedBehavior(segments[0] as BehaviorType);
                setSelectedSize(segments[1] as SizeType | null);
            } else {
                setSelectedUser(segments[0]);
                if (segments.length > 1) {
                    setSelectedBehavior(segments[1] as BehaviorType);
                    setSelectedSize(segments[2] as SizeType | null);
                }
            }
        }
    }, [params]);

    const getBehavior = (type: string): BehaviorType => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    };

    const updateURL = (user: string | null, behavior: BehaviorType | null, size: SizeType | null) => {
        let url = '/';
        if (user) url += `${user}/`;
        if (behavior) {
            url += `${behavior}/`;
            if (size) url += `${size}`;
        }
        router.push(url);
    };

    const handleUserSelect = (username: string) => {
        setSelectedUser(username === selectedUser ? null : username);
        updateURL(username === selectedUser ? null : username, selectedBehavior, selectedSize);
    };

    const handleBehaviorSelect = (behavior: BehaviorType) => {
        setSelectedBehavior(behavior === selectedBehavior ? null : behavior);
        updateURL(selectedUser, behavior === selectedBehavior ? null : behavior, selectedSize);
    };

    const handleSizeSelect = (size: SizeType) => {
        setSelectedSize(size === selectedSize ? null : size);
        updateURL(selectedUser, selectedBehavior, size === selectedSize ? null : size);
    };

    const filteredMedia = mediaObjects.filter(obj =>
        (!selectedUser || obj.user.name === selectedUser) &&
        (!selectedBehavior || getBehavior(obj.type) === selectedBehavior) &&
        (!selectedSize || obj.size === selectedSize)
    );

    const users = Array.from(new Set(mediaObjects.map(obj => obj.user.name)));

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Users</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user} className="mb-1">
                                <button
                                    onClick={() => handleUserSelect(user)}
                                    className={`text-sm ${selectedUser === user ? 'text-blue-400' : 'text-gray-400'}`}
                                >
                                    {user}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Behaviors</h3>
                    <ul>
                        {['read', 'look', 'listen'].map(behavior => (
                            <li key={behavior} className="mb-1">
                                <button
                                    onClick={() => handleBehaviorSelect(behavior as BehaviorType)}
                                    className={`text-sm ${selectedBehavior === behavior ? 'text-blue-400' : 'text-gray-400'}`}
                                >
                                    {behavior.charAt(0).toUpperCase() + behavior.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Sizes</h3>
                    <ul>
                        {['s', 'm', 'l'].map(size => (
                            <li key={size} className="mb-1">
                                <button
                                    onClick={() => handleSizeSelect(size as SizeType)}
                                    className={`text-sm ${selectedSize === size ? 'text-blue-400' : 'text-gray-400'}`}
                                >
                                    {size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Media Grid</h1>
                <MediaGrid mediaObjects={filteredMedia} />
            </div>
        </div>
    );
}
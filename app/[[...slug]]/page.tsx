'use client';

import { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'user' | 'behavior' | 'type' | 'year' | 'size' | 'creator';

export default function MediaGridPage() {
    const [mediaObjects, setMediaObjects] = useState<MediaObjectWithUser[]>([]);
    const [filters, setFilters] = useState<Record<FilterType, string | null>>({
        user: null,
        behavior: null,
        type: null,
        year: null,
        size: null,
        creator: null
    });
    const [allPossibleValues, setAllPossibleValues] = useState<Record<FilterType, string[]>>({
        user: [],
        behavior: ['read', 'look', 'listen'],
        type: [],
        year: [],
        size: ['s', 'm', 'l'],
        creator: []
    });

    useEffect(() => {
        fetchMediaObjects();
    }, []);

    const fetchMediaObjects = async () => {
        const response = await fetch('/api/media');
        const data: MediaObjectWithUser[] = await response.json();
        setMediaObjects(data);
        updateAllPossibleValues(data);
    };

    const updateAllPossibleValues = (data: MediaObjectWithUser[]) => {
        setAllPossibleValues({
            user: Array.from(new Set(data.map(obj => obj.user.name))),
            behavior: ['read', 'look', 'listen'],
            type: Array.from(new Set(data.map(obj => obj.type))),
            year: Array.from(new Set(data.map(obj => obj.year?.toString()).filter(Boolean))),
            size: ['s', 'm', 'l'],
            creator: Array.from(new Set(data.map(obj => obj.creator).filter(Boolean)))
        });
    };

    const handleFilter = (filterType: FilterType, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType] === value ? null : value
        }));
    };

    const filteredMedia = mediaObjects.filter(obj =>
        Object.entries(filters).every(([key, value]) =>
            !value ||
            (key === 'behavior' ? getBehavior(obj.type) === value : obj[key as keyof MediaObjectWithUser] === value)
        )
    );

    const getBehavior = (type: string): string => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    };

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                {(Object.keys(allPossibleValues) as FilterType[]).map(filterType => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                        <ul>
                            {allPossibleValues[filterType].map(value => (
                                <li key={value} className="mb-1">
                                    <button
                                        onClick={() => handleFilter(filterType, value)}
                                        className={`text-sm ${filters[filterType] === value
                                                ? 'text-blue-400 font-bold'
                                                : 'text-gray-300'
                                            }`}
                                    >
                                        {value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Media Grid</h1>
                <MediaGrid mediaObjects={filteredMedia} />
            </div>
        </div>
    );
}
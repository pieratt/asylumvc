'use client';

import { useState, useEffect } from 'react';
import { MediaObject, User } from '@prisma/client';
import Image from 'next/image';

type FilterType = 'behavior' | 'size' | 'user' | 'creator' | 'year' | 'type';

export default function MediaGridPage() {
    const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
    const [filters, setFilters] = useState<Record<FilterType, string[]>>({
        behavior: [],
        size: [],
        user: [],
        creator: [],
        year: [],
        type: []
    });
    const [activeFilters, setActiveFilters] = useState<Record<FilterType, string[]>>({
        behavior: [],
        size: [],
        user: [],
        creator: [],
        year: [],
        type: []
    });

    useEffect(() => {
        fetchMediaObjects();
    }, []);

    const fetchMediaObjects = async () => {
        const response = await fetch('/api/media');
        const data = await response.json();
        setMediaObjects(data);
        updateAvailableFilters(data);
    };

    const updateAvailableFilters = (data: MediaObject[]) => {
        const newFilters: Record<FilterType, Set<string>> = {
            behavior: new Set(),
            size: new Set(),
            user: new Set(),
            creator: new Set(),
            year: new Set(),
            type: new Set()
        };

        data.forEach(obj => {
            newFilters.behavior.add(getBehavior(obj.type));
            newFilters.size.add(obj.size || '');
            newFilters.user.add(obj.user?.name || '');
            newFilters.creator.add(obj.creator || '');
            newFilters.year.add(obj.year?.toString() || '');
            newFilters.type.add(obj.type);
        });

        setFilters(Object.fromEntries(
            Object.entries(newFilters).map(([key, value]) => [key, Array.from(value)])
        ) as Record<FilterType, string[]>);
    };

    const getBehavior = (type: string): string => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        if (['Music', 'Podcast'].includes(type)) return 'listen';
        return '';
    };

    const toggleFilter = (type: FilterType, value: string) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            if (newFilters[type].includes(value)) {
                newFilters[type] = newFilters[type].filter(v => v !== value);
            } else {
                newFilters[type] = [...newFilters[type], value];
            }
            return newFilters;
        });
    };

    const filteredMedia = mediaObjects.filter(obj =>
        (activeFilters.behavior.length === 0 || activeFilters.behavior.includes(getBehavior(obj.type))) &&
        (activeFilters.size.length === 0 || activeFilters.size.includes(obj.size || '')) &&
        (activeFilters.user.length === 0 || activeFilters.user.includes(obj.user?.name || '')) &&
        (activeFilters.creator.length === 0 || activeFilters.creator.includes(obj.creator || '')) &&
        (activeFilters.year.length === 0 || activeFilters.year.includes(obj.year?.toString() || '')) &&
        (activeFilters.type.length === 0 || activeFilters.type.includes(obj.type))
    );

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                {Object.entries(filters).map(([filterType, values]) => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 capitalize">{filterType}</h3>
                        <ul>
                            {values.map(value => (
                                <li key={value} className="mb-1">
                                    <button
                                        onClick={() => toggleFilter(filterType as FilterType, value)}
                                        className={`text-sm ${activeFilters[filterType as FilterType].includes(value) ? 'text-blue-400' : 'text-gray-400'}`}
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
                <div className="grid grid-cols-4 gap-1">
                    {filteredMedia.map(media => (
                        <div key={media.id} className="aspect-square border border-gray-700 p-2 flex flex-col">
                            {media.image && (
                                <div className="relative flex-grow">
                                    <Image
                                        src={media.image}
                                        alt={media.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                            <div className="mt-2">
                                <h3 className="text-sm font-semibold">{media.title}</h3>
                                <p className="text-xs text-gray-400">{media.creator}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
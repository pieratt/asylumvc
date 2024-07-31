'use client';

import { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'behavior' | 'size' | 'user' | 'creator' | 'year' | 'type';

export default function MediaGridPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mediaObjects, setMediaObjects] = useState<MediaObjectWithUser[]>([]);
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

    const updateAvailableFilters = useCallback((data: MediaObjectWithUser[]) => {
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
            newFilters.user.add(obj.user.name);
            newFilters.creator.add(obj.creator || '');
            newFilters.year.add(obj.year?.toString() || '');
            newFilters.type.add(obj.type);
        });

        setFilters(Object.fromEntries(
            Object.entries(newFilters).map(([key, value]) => [key, Array.from(value)])
        ) as Record<FilterType, string[]>);
    }, []);

    const fetchMediaObjects = useCallback(async () => {
        const response = await fetch('/api/media');
        const data: MediaObjectWithUser[] = await response.json();
        setMediaObjects(data);
        updateAvailableFilters(data);
    }, [updateAvailableFilters]);

    useEffect(() => {
        fetchMediaObjects();
    }, [fetchMediaObjects]);

    useEffect(() => {
        const newActiveFilters: Record<FilterType, string[]> = {
            behavior: [],
            size: [],
            user: [],
            creator: [],
            year: [],
            type: []
        };

        searchParams.forEach((value, key) => {
            if (key in newActiveFilters) {
                newActiveFilters[key as FilterType] = value.split(',');
            }
        });

        setActiveFilters(newActiveFilters);
    }, [searchParams]);

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
            updateURL(newFilters);
            return newFilters;
        });
    };

    const updateURL = (filters: Record<FilterType, string[]>) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                params.set(key, values.join(','));
            }
        });
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    const filteredMedia = mediaObjects.filter(obj =>
        (activeFilters.behavior.length === 0 || activeFilters.behavior.includes(getBehavior(obj.type))) &&
        (activeFilters.size.length === 0 || activeFilters.size.includes(obj.size || '')) &&
        (activeFilters.user.length === 0 || activeFilters.user.includes(obj.user.name)) &&
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
                <MediaGrid mediaObjects={filteredMedia} />
            </div>
        </div>
    );
}
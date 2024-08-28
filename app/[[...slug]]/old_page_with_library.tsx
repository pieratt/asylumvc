/*
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'username' | 'behavior' | 'type' | 'year' | 'size' | 'creator';

const behaviorEmojis: Record<string, string> = {
    'read': '📖📖📖',
    'look': '👀',
    'listen': '🎧'
};

const MediaGridPage: React.FC = () => {
    const [mediaObjects, setMediaObjects] = useState<MediaObjectWithUser[]>([]);
    const [filters, setFilters] = useState<Record<FilterType, string | null>>({
        username: null,
        behavior: null,
        type: null,
        year: null,
        size: null,
        creator: null
    });
    const [allPossibleValues, setAllPossibleValues] = useState<Record<FilterType, string[]>>({
        username: [],
        behavior: ['read', 'look', 'listen'],
        type: [],
        year: [],
        size: ['s', 'm', 'l'],
        creator: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchMediaObjects = useCallback(async () => {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });

        try {
            const response = await fetch(`/api/media?${queryParams.toString()}`);
            const data: MediaObjectWithUser[] = await response.json();
            setMediaObjects(data);
            updateAllPossibleValues(data);
        } catch (error) {
            console.error('Error fetching media objects:', error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    const updateAllPossibleValues = (data: MediaObjectWithUser[]) => {
        setAllPossibleValues({
            username: Array.from(new Set(data.map(obj => obj.user.name))),
            behavior: ['read', 'look', 'listen'],
            type: Array.from(new Set(data.map(obj => obj.type))),
            year: Array.from(new Set(data.map(obj => obj.year)
                .filter((year): year is number => year !== null && year !== undefined)
                .map(year => year.toString())
            )),
            size: ['s', 'm', 'l'],
            creator: Array.from(new Set(data.map(obj => obj.creator).filter((creator): creator is string => creator !== null && creator !== undefined)))
        });
    };

    useEffect(() => {
        fetchMediaObjects();
    }, [fetchMediaObjects]);

    const handleFilter = (filterType: FilterType, value: string) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (newFilters[filterType] === value) {
                newFilters[filterType] = null;
            } else {
                newFilters[filterType] = value;
                if (filterType === 'username') {
                    newFilters.behavior = null;
                } else if (filterType === 'behavior') {
                    newFilters.username = null;
                }
            }
            return newFilters;
        });
    };

    const FilterButton: React.FC<{ filterType: FilterType; value: string; isSelected: boolean }> = ({ filterType, value, isSelected }) => (
        <button
            onClick={() => handleFilter(filterType, value)}
            className={`text-sm ${isSelected ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
        >
            {filterType === 'behavior' ? behaviorEmojis[value] : value}
        </button>
    );

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                {(Object.keys(allPossibleValues) as FilterType[]).map(filterType => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                        <ul>
                            {allPossibleValues[filterType].map(value => (
                                <li key={value} className="mb-1">
                                    <FilterButton
                                        filterType={filterType}
                                        value={value}
                                        isSelected={filters[filterType] === value}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Media Grid</h1>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <MediaGrid mediaObjects={mediaObjects} />
                )}
            </div>
        </div>
    );
};

export default MediaGridPage; 
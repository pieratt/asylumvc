'use client';

import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'username' | 'behavior' | 'type' | 'year' | 'size' | 'creator';

// ... (keep the existing types, initial state, and reducer)

const behaviorEmojis: Record<string, string> = {
    'read': '📖',
    'look': '👀',
    'listen': '🎧'
};

const FilterButton = React.memo(({
    filterType,
    value,
    isSelected,
    onClick
}: {
    filterType: FilterType;
    value: string;
    isSelected: boolean;
    onClick: (filterType: FilterType, value: string) => void;
}) => (
    <button
        onClick={() => onClick(filterType, value)}
        className={`text-sm ${isSelected ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
    >
        {filterType === 'behavior' ? behaviorEmojis[value] : value}
    </button>
));

const FilterSection = React.memo(({
    filterType,
    values,
    selectedValue,
    onFilterChange
}: {
    filterType: FilterType;
    values: string[];
    selectedValue: string | null;
    onFilterChange: (filterType: FilterType, value: string) => void;
}) => (
    <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
        <ul>
            {values.map(value => (
                <li key={value} className="mb-1">
                    <FilterButton
                        filterType={filterType}
                        value={value}
                        isSelected={selectedValue === value}
                        onClick={onFilterChange}
                    />
                </li>
            ))}
        </ul>
    </div>
));

const MediaGridPage: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const fetchMediaObjects = useCallback(async (filters: Record<FilterType, string | null>) => {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });

        try {
            const response = await fetch(`/api/media?${queryParams.toString()}`);
            const data: MediaObjectWithUser[] = await response.json();
            dispatch({ type: 'SET_MEDIA_OBJECTS', payload: data });
            updateAllPossibleValues(data);
        } catch (error) {
            console.error('Error fetching media objects:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateAllPossibleValues = useCallback((data: MediaObjectWithUser[]) => {
        const newAllPossibleValues: Record<FilterType, string[]> = {
            username: Array.from(new Set(data.map(obj => obj.user.name))),
            behavior: ['read', 'look', 'listen'],
            type: Array.from(new Set(data.map(obj => obj.type))),
            year: Array.from(new Set(data.map(obj => obj.year?.toString()).filter((year): year is string => year !== undefined && year !== null))),
            size: ['s', 'm', 'l'],
            creator: Array.from(new Set(data.map(obj => obj.creator).filter((creator): creator is string => creator !== null && creator !== undefined)))
        };
        dispatch({ type: 'SET_ALL_POSSIBLE_VALUES', payload: newAllPossibleValues });
    }, []);

    const updateFiltersFromURL = useCallback(() => {
        const newFilters: Record<FilterType, string | null> = { ...initialState.filters };

        if (params.slug) {
            const [usernameOrBehavior, behavior] = params.slug as string[];
            if (state.allPossibleValues.username.includes(usernameOrBehavior)) {
                newFilters.username = usernameOrBehavior;
                if (behavior) newFilters.behavior = behavior;
            } else {
                newFilters.behavior = usernameOrBehavior;
            }
        }

        searchParams.forEach((value, key) => {
            if (key in newFilters) {
                newFilters[key as FilterType] = value;
            }
        });

        dispatch({ type: 'SET_FILTERS', payload: newFilters });
        fetchMediaObjects(newFilters);
    }, [params.slug, searchParams, state.allPossibleValues.username, fetchMediaObjects]);

    useEffect(() => {
        updateFiltersFromURL();
    }, [updateFiltersFromURL]);

    const handleFilter = useCallback((filterType: FilterType, value: string) => {
        const newFilters = { ...state.filters };

        if (newFilters[filterType] === value) {
            newFilters[filterType] = null;
        } else {
            newFilters[filterType] = value;

            // Clear behavior if username is set, and vice versa
            if (filterType === 'username') {
                newFilters.behavior = null;
            } else if (filterType === 'behavior') {
                newFilters.username = null;
            }
        }

        dispatch({ type: 'SET_FILTERS', payload: newFilters });

        let path = '/';
        if (newFilters.username) path += newFilters.username + '/';
        if (newFilters.behavior) path += behaviorEmojis[newFilters.behavior] || newFilters.behavior;

        const query = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && key !== 'username' && key !== 'behavior') {
                query.set(key, value);
            }
        });

        router.push(path + (query.toString() ? '?' + query.toString() : ''), { scroll: false });
        fetchMediaObjects(newFilters);
    }, [state.filters, router, fetchMediaObjects]);

    const filteredMediaObjects = useMemo(() => {
        return state.mediaObjects;
    }, [state.mediaObjects]);

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                {(Object.keys(state.allPossibleValues) as FilterType[]).map(filterType => (
                    <FilterSection
                        key={filterType}
                        filterType={filterType}
                        values={state.allPossibleValues[filterType]}
                        selectedValue={state.filters[filterType]}
                        onFilterChange={handleFilter}
                    />
                ))}
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Media Grid</h1>
                <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                    <MediaGrid mediaObjects={filteredMediaObjects} />
                </div>
            </div>
        </div>
    );
};

export default MediaGridPage;
'use client';

import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'user' | 'behavior' | 'type' | 'year' | 'size' | 'creator';

type State = {
    mediaObjects: MediaObjectWithUser[];
    filters: Record<FilterType, string | null>;
    allPossibleValues: Record<FilterType, string[]>;
};

type Action =
    | { type: 'SET_MEDIA_OBJECTS'; payload: MediaObjectWithUser[] }
    | { type: 'SET_FILTER'; payload: { filterType: FilterType; value: string | null } }
    | { type: 'SET_ALL_POSSIBLE_VALUES'; payload: Record<FilterType, string[]> }
    | { type: 'SET_FILTERS'; payload: Record<FilterType, string | null> };

const initialState: State = {
    mediaObjects: [],
    filters: {
        user: null,
        behavior: null,
        type: null,
        year: null,
        size: null,
        creator: null
    },
    allPossibleValues: {
        user: [],
        behavior: ['read', 'look', 'listen'],
        type: [],
        year: [],
        size: ['s', 'm', 'l'],
        creator: []
    }
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_MEDIA_OBJECTS':
            return { ...state, mediaObjects: action.payload };
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: action.payload.value
                }
            };
        case 'SET_ALL_POSSIBLE_VALUES':
            return { ...state, allPossibleValues: action.payload };
        case 'SET_FILTERS':
            return { ...state, filters: action.payload };
        default:
            return state;
    }
}

const behaviorEmojis: Record<string, string> = {
    'read': '📖',
    'look': '👀',
    'listen': '🎧'
};

const MediaGridPage: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const fetchMediaObjects = useCallback(async () => {
        try {
            const response = await fetch('/api/media');
            const data: MediaObjectWithUser[] = await response.json();
            dispatch({ type: 'SET_MEDIA_OBJECTS', payload: data });
            updateAllPossibleValues(data);
        } catch (error) {
            console.error('Error fetching media objects:', error);
        }
    }, []);

    useEffect(() => {
        fetchMediaObjects();
    }, [fetchMediaObjects]);

    const updateAllPossibleValues = useCallback((data: MediaObjectWithUser[]) => {
        const newAllPossibleValues: Record<FilterType, string[]> = {
            user: Array.from(new Set(data.map(obj => obj.user.name))),
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
            const [userOrBehavior, behavior] = params.slug as string[];
            if (state.allPossibleValues.user.includes(userOrBehavior)) {
                newFilters.user = userOrBehavior;
                if (behavior) newFilters.behavior = behavior;
            } else {
                newFilters.behavior = userOrBehavior;
            }
        }

        const size = searchParams.get('size') as 's' | 'm' | 'l' | null;
        if (size) newFilters.size = size;

        dispatch({ type: 'SET_FILTERS', payload: newFilters });
    }, [params.slug, searchParams, state.allPossibleValues.user]);

    useEffect(() => {
        updateFiltersFromURL();
    }, [updateFiltersFromURL]);

    const handleFilter = useCallback((filterType: FilterType, value: string | null) => {
        const newFilters = { ...state.filters, [filterType]: value };
        dispatch({ type: 'SET_FILTERS', payload: newFilters });

        let path = '/';
        if (newFilters.user) path += newFilters.user + '/';
        if (newFilters.behavior) path += behaviorEmojis[newFilters.behavior] || newFilters.behavior;

        const query = new URLSearchParams();
        if (newFilters.size) query.set('size', newFilters.size);

        router.push(path + (query.toString() ? '?' + query.toString() : ''), { scroll: false });
    }, [state.filters, router]);

    const filteredMedia = useMemo(() => {
        return state.mediaObjects.filter(obj =>
            Object.entries(state.filters).every(([key, value]) =>
                !value || obj[key as keyof MediaObjectWithUser] === value ||
                (key === 'behavior' && getBehavior(obj.type) === value)
            )
        );
    }, [state.mediaObjects, state.filters]);

    const getBehavior = useCallback((type: string): string => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    }, []);

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                {(Object.keys(state.allPossibleValues) as FilterType[]).map(filterType => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                        <ul>
                            {state.allPossibleValues[filterType].map(value => (
                                <li key={value} className="mb-1">
                                    <button
                                        onClick={() => handleFilter(filterType, value === state.filters[filterType] ? null : value)}
                                        className={`text-sm ${state.filters[filterType] === value ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
                                    >
                                        {filterType === 'behavior' ? behaviorEmojis[value] : value}
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
};

export default MediaGridPage;
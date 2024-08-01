'use client';

import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'username' | 'behavior' | 'type' | 'year' | 'size' | 'creator';

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
        username: null,
        behavior: null,
        type: null,
        year: null,
        size: null,
        creator: null
    },
    allPossibleValues: {
        username: [],
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

    const fetchMediaObjects = useCallback(async (filters: Record<FilterType, string | null>) => {
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

    const handleFilter = useCallback((filterType: FilterType, value: string | null) => {
        const newFilters = { ...state.filters, [filterType]: value };
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
                <MediaGrid mediaObjects={state.mediaObjects} />
            </div>
        </div>
    );
};

export default MediaGridPage;
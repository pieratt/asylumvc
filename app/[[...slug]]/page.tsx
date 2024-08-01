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
    | { type: 'SET_ALL_POSSIBLE_VALUES'; payload: Record<FilterType, string[]> };

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
    console.log('Reducer called with action:', action);
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
        default:
            return state;
    }
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please refresh the page.</h1>;
        }

        return this.props.children;
    }
}

const FilterButton: React.FC<{ value: string; isSelected: boolean; onClick: () => void }> = React.memo(({ value, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`text-sm ${isSelected ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
    >
        {value}
    </button>
));

FilterButton.displayName = 'FilterButton';

const MediaGridPage: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const fetchMediaObjects = useCallback(async () => {
        console.log('Fetching media objects');
        try {
            const response = await fetch('/api/media');
            const data: MediaObjectWithUser[] = await response.json();
            console.log('Fetched media objects:', data);
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
        console.log('Updating all possible values');
        const newAllPossibleValues = {
            user: Array.from(new Set(data.map(obj => obj.user.name))),
            behavior: ['read', 'look', 'listen'],
            type: Array.from(new Set(data.map(obj => obj.type))),
            year: Array.from(new Set(data.map(obj => obj.year?.toString()).filter(Boolean))),
            size: ['s', 'm', 'l'],
            creator: Array.from(new Set(data.map(obj => obj.creator).filter(Boolean)))
        };
        console.log('New all possible values:', newAllPossibleValues);
        dispatch({ type: 'SET_ALL_POSSIBLE_VALUES', payload: newAllPossibleValues });
    }, []);

    const handleFilter = useCallback((filterType: FilterType, value: string) => {
        console.log('Handling filter:', filterType, value);
        dispatch({
            type: 'SET_FILTER',
            payload: {
                filterType,
                value: state.filters[filterType] === value ? null : value
            }
        });
    }, [state.filters]);

    const getBehavior = useCallback((type: string): string => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    }, []);

    const filteredMedia = useMemo(() => {
        console.log('Filtering media objects');
        return state.mediaObjects.filter(obj =>
            Object.entries(state.filters).every(([key, value]) =>
                !value ||
                (key === 'behavior' ? getBehavior(obj.type) === value : obj[key as keyof MediaObjectWithUser] === value)
            )
        );
    }, [state.mediaObjects, state.filters, getBehavior]);

    useEffect(() => {
        console.log('Current state:', state);
    }, [state]);

    return (
        <ErrorBoundary>
            <div className="flex bg-gray-900 text-white min-h-screen">
                <div className="w-64 p-4 border-r border-gray-700">
                    {(Object.keys(state.allPossibleValues) as FilterType[]).map(filterType => (
                        <div key={filterType} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                            <ul>
                                {state.allPossibleValues[filterType].map(value => (
                                    <li key={value} className="mb-1">
                                        <FilterButton
                                            value={value}
                                            isSelected={state.filters[filterType] === value}
                                            onClick={() => handleFilter(filterType, value)}
                                        />
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
        </ErrorBoundary>
    );
};

MediaGridPage.displayName = 'MediaGridPage';

export default MediaGridPage;
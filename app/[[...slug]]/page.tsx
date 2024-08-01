'use client';

import { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';

type MediaObjectWithUser = MediaObject & { user: User };
type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function MediaGridPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const [mediaObjects, setMediaObjects] = useState<MediaObjectWithUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType | null>(null);
    const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
    const [allPossibleValues, setAllPossibleValues] = useState<Record<string, string[]>>({
        user: [],
        behavior: ['read', 'look', 'listen'],
        type: [],
        year: [],
        size: ['s', 'm', 'l'],
        creator: []
    });

    const fetchMediaObjects = useCallback(async () => {
        const queryParams = new URLSearchParams();
        if (selectedUser) queryParams.set('username', selectedUser);
        if (selectedBehavior) queryParams.set('behavior', selectedBehavior);
        if (selectedType) queryParams.set('type', selectedType);
        if (selectedYear) queryParams.set('year', selectedYear);
        if (selectedSize) queryParams.set('size', selectedSize);
        if (selectedCreator) queryParams.set('creator', selectedCreator);

        const response = await fetch(`/api/media?${queryParams.toString()}`);
        const data: MediaObjectWithUser[] = await response.json();
        setMediaObjects(data);
    }, [selectedUser, selectedBehavior, selectedType, selectedYear, selectedSize, selectedCreator]);

    useEffect(() => {
        fetchMediaObjects();
    }, [fetchMediaObjects]);

    useEffect(() => {
        const newAllPossibleValues = {
            user: Array.from(new Set(mediaObjects.map(obj => obj.user.name))),
            behavior: ['read', 'look', 'listen'],
            type: Array.from(new Set(mediaObjects.map(obj => obj.type))),
            year: Array.from(new Set(mediaObjects.map(obj => obj.year?.toString()).filter((year): year is string => year !== undefined && year !== null))),
            size: ['s', 'm', 'l'],
            creator: Array.from(new Set(mediaObjects.map(obj => obj.creator).filter((creator): creator is string => creator !== null && creator !== undefined)))
        };
        setAllPossibleValues(newAllPossibleValues);
    }, [mediaObjects]);

    const getBehavior = (type: string): BehaviorType => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    };

    const handleFilter = (filterType: string, value: string | null) => {
        let newUser = selectedUser;
        let newBehavior = selectedBehavior;
        let newType = selectedType;
        let newYear = selectedYear;
        let newSize = selectedSize;
        let newCreator = selectedCreator;

        switch (filterType) {
            case 'user':
                newUser = value === selectedUser ? null : value;
                setSelectedUser(newUser);
                break;
            case 'behavior':
                newBehavior = value === selectedBehavior ? null : value as BehaviorType | null;
                setSelectedBehavior(newBehavior);
                break;
            case 'type':
                newType = value === selectedType ? null : value;
                setSelectedType(newType);
                break;
            case 'year':
                newYear = value === selectedYear ? null : value;
                setSelectedYear(newYear);
                break;
            case 'size':
                newSize = value === selectedSize ? null : value as SizeType | null;
                setSelectedSize(newSize);
                break;
            case 'creator':
                newCreator = value === selectedCreator ? null : value;
                setSelectedCreator(newCreator);
                break;
        }

        updateURL(newUser, newBehavior, newType, newYear, newSize, newCreator);
    };

    const updateURL = (user: string | null, behavior: BehaviorType | null, type: string | null, year: string | null, size: SizeType | null, creator: string | null) => {
        const segments = [user, behavior, type, year, size].filter(Boolean);
        let url = '/' + segments.join('/');

        const queryParams = new URLSearchParams();
        if (creator) queryParams.set('creator', creator);

        const queryString = queryParams.toString();
        if (queryString) url += `?${queryString}`;

        router.push(url);
    };

    const getApplicableValues = useCallback((filterType: string) => {
        return mediaObjects.filter(obj =>
            (!selectedUser || obj.user.name === selectedUser) &&
            (!selectedBehavior || getBehavior(obj.type) === selectedBehavior) &&
            (!selectedType || obj.type === selectedType) &&
            (!selectedYear || obj.year?.toString() === selectedYear) &&
            (!selectedSize || obj.size === selectedSize) &&
            (!selectedCreator || obj.creator === selectedCreator)
        ).map(obj => {
            switch (filterType) {
                case 'user': return obj.user.name;
                case 'behavior': return getBehavior(obj.type);
                case 'type': return obj.type;
                case 'year': return obj.year?.toString();
                case 'size': return obj.size;
                case 'creator': return obj.creator;
                default: return null;
            }
        }).filter((value): value is string => value !== null && value !== undefined);
    }, [mediaObjects, selectedUser, selectedBehavior, selectedType, selectedYear, selectedSize, selectedCreator]);

    const filterCategories = [
        { title: 'Users', values: allPossibleValues.user, filterType: 'user', selected: selectedUser },
        { title: 'Behaviors', values: allPossibleValues.behavior, filterType: 'behavior', selected: selectedBehavior },
        { title: 'Types', values: allPossibleValues.type, filterType: 'type', selected: selectedType },
        { title: 'Years', values: allPossibleValues.year, filterType: 'year', selected: selectedYear },
        { title: 'Sizes', values: allPossibleValues.size, filterType: 'size', selected: selectedSize },
        { title: 'Creators', values: allPossibleValues.creator, filterType: 'creator', selected: selectedCreator },
    ];

    const filteredMedia = mediaObjects.filter(obj =>
        (!selectedUser || obj.user.name === selectedUser) &&
        (!selectedBehavior || getBehavior(obj.type) === selectedBehavior) &&
        (!selectedType || obj.type === selectedType) &&
        (!selectedYear || obj.year?.toString() === selectedYear) &&
        (!selectedSize || obj.size === selectedSize) &&
        (!selectedCreator || obj.creator === selectedCreator)
    );

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                {filterCategories.map(({ title, values, filterType, selected }) => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <ul>
                            {values.map(value => {
                                const isApplicable = getApplicableValues(filterType).includes(value);
                                return (
                                    <li key={value} className="mb-1">
                                        <button
                                            onClick={() => handleFilter(filterType, value)}
                                            className={`text-sm ${selected === value
                                                    ? 'text-blue-400 font-bold'
                                                    : isApplicable
                                                        ? 'text-gray-300'
                                                        : 'text-gray-600'
                                                }`}
                                        >
                                            {value}
                                        </button>
                                    </li>
                                );
                            })}
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
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
    export default function MediaGridPage() {
        // ... existing state declarations ...

        const [allPossibleValues, setAllPossibleValues] = useState<Record<string, string[]>>({
            user: [],
            behavior: ['read', 'look', 'listen'],
            type: [],
            year: [],
            size: ['s', 'm', 'l'],
            creator: []
        });

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
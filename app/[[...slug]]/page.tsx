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
        const segments = (params.slug as string[] | undefined) || [];
        let userSet = false, behaviorSet = false, typeSet = false, yearSet = false, sizeSet = false;

        segments.forEach((segment, index) => {
            if (!userSet && index === 0) {
                setSelectedUser(segment);
                userSet = true;
            } else if (!behaviorSet && ['read', 'look', 'listen'].includes(segment)) {
                setSelectedBehavior(segment as BehaviorType);
                behaviorSet = true;
            } else if (!typeSet && !['s', 'm', 'l'].includes(segment) && isNaN(Number(segment))) {
                setSelectedType(segment);
                typeSet = true;
            } else if (!yearSet && !isNaN(Number(segment))) {
                setSelectedYear(segment);
                yearSet = true;
            } else if (!sizeSet && ['s', 'm', 'l'].includes(segment)) {
                setSelectedSize(segment as SizeType);
                sizeSet = true;
            }
        });

        setSelectedCreator(searchParams.get('creator'));
    }, [params, searchParams]);

    const getBehavior = (type: string): BehaviorType => {
        if (['Book', 'Post', 'Quote', 'Tweet'].includes(type)) return 'read';
        if (['Art', 'Film', 'Tiktok', 'Youtube'].includes(type)) return 'look';
        return 'listen';
    };

    const updateURL = () => {
        const segments = [];
        if (selectedUser) segments.push(selectedUser);
        if (selectedBehavior) segments.push(selectedBehavior);
        if (selectedType) segments.push(selectedType);
        if (selectedYear) segments.push(selectedYear);
        if (selectedSize) segments.push(selectedSize);

        let url = '/' + segments.join('/');

        const queryParams = new URLSearchParams();
        if (selectedCreator) queryParams.set('creator', selectedCreator);

        const queryString = queryParams.toString();
        if (queryString) url += `?${queryString}`;

        router.push(url);
    };

    const handleFilter = (filterType: string, value: string | null | undefined) => {
        if (value === undefined) return;  // Do nothing if value is undefined

        switch (filterType) {
            case 'user':
                setSelectedUser(value === selectedUser ? null : value);
                break;
            case 'behavior':
                setSelectedBehavior(value === selectedBehavior ? null : value as BehaviorType | null);
                break;
            case 'type':
                setSelectedType(value === selectedType ? null : value);
                break;
            case 'year':
                setSelectedYear(value === selectedYear ? null : value);
                break;
            case 'size':
                setSelectedSize(value === selectedSize ? null : value as SizeType | null);
                break;
            case 'creator':
                setSelectedCreator(value === selectedCreator ? null : value);
                break;
        }
        updateURL();
    };

    const filteredMedia = mediaObjects.filter(obj =>
        (!selectedUser || obj.user.name === selectedUser) &&
        (!selectedBehavior || getBehavior(obj.type) === selectedBehavior) &&
        (!selectedType || obj.type === selectedType) &&
        (!selectedYear || obj.year?.toString() === selectedYear) &&
        (!selectedSize || obj.size === selectedSize) &&
        (!selectedCreator || obj.creator === selectedCreator)
    );

    const getUniqueValues = (key: keyof MediaObjectWithUser) =>
        Array.from(new Set(mediaObjects.map(obj => {
            if (key === 'user') {
                return obj.user?.name;
            }
            return obj[key]?.toString();
        }))).filter((value): value is string => value !== undefined && value !== null);

    const users = getUniqueValues('user');
    const types = getUniqueValues('type');
    const years = getUniqueValues('year');
    const creators = getUniqueValues('creator');

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <div className="w-64 p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                {[
                    { title: 'Users', values: users, filterType: 'user', selected: selectedUser },
                    { title: 'Behaviors', values: ['read', 'look', 'listen'], filterType: 'behavior', selected: selectedBehavior },
                    { title: 'Types', values: types, filterType: 'type', selected: selectedType },
                    { title: 'Years', values: years, filterType: 'year', selected: selectedYear },
                    { title: 'Sizes', values: ['s', 'm', 'l'], filterType: 'size', selected: selectedSize },
                    { title: 'Creators', values: creators, filterType: 'creator', selected: selectedCreator },
                ].map(({ title, values, filterType, selected }) => (
                    <div key={filterType} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <ul>
                            {values.map(value => (
                                <li key={value} className="mb-1">
                                    <button
                                        onClick={() => handleFilter(filterType, value === selected ? null : value)}
                                        className={`text-sm ${selected === value ? 'text-blue-400' : 'text-gray-400'}`}
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
'use client';

import { useState, useEffect, useCallback } from 'react';
import { MediaObject, User } from '@prisma/client';
import Image from 'next/image';

type MediaObjectWithUser = MediaObject & { user: User };
type FilterType = 'behavior' | 'size' | 'user' | 'creator' | 'year' | 'type';

export default function MediaGridPage() {
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

    // ... rest of your component code ...
}
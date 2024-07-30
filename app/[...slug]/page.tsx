'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MediaGrid from '../../components/MediaGrid';
import { MediaObject } from '@prisma/client';

export default function DynamicPage() {
    const params = useParams();
    const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMediaObjects();
    }, [params]);

    const fetchMediaObjects = async () => {
        setIsLoading(true);
        const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
        const queryParams = new URLSearchParams();

        if (slug.length > 0) {
            if (['read', 'look', 'listen'].includes(slug[0])) {
                queryParams.set('behavior', slug[0]);
                if (slug[1] && ['s', 'm', 'l'].includes(slug[1])) {
                    queryParams.set('size', slug[1]);
                }
            } else {
                queryParams.set('username', slug[0]);
                if (slug[1]) {
                    if (['read', 'look', 'listen'].includes(slug[1])) {
                        queryParams.set('behavior', slug[1]);
                        if (slug[2] && ['s', 'm', 'l'].includes(slug[2])) {
                            queryParams.set('size', slug[2]);
                        }
                    } else {
                        queryParams.set('type', slug[1]);
                    }
                }
            }
        }

        const response = await fetch(`/api/media?${queryParams.toString()}`);
        const data = await response.json();
        setMediaObjects(data);
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">AsylumVC Media Library</h1>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <MediaGrid mediaObjects={mediaObjects} />
            )}
        </div>
    );
}
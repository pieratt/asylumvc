import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { MediaObject } from '@prisma/client';

export function useMediaObjects() {
    const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchMediaObjects();
    }, [pathname, searchParams]);

    const fetchMediaObjects = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(searchParams);
            const path = pathname.split('/').filter(Boolean);

            if (path.length > 0) {
                if (['read', 'look', 'listen'].includes(path[0])) {
                    params.set('behavior', path[0]);
                    if (path[1] && ['s', 'm', 'l'].includes(path[1])) {
                        params.set('size', path[1]);
                    }
                } else {
                    params.set('username', path[0]);
                    if (path[1]) {
                        if (['read', 'look', 'listen'].includes(path[1])) {
                            params.set('behavior', path[1]);
                            if (path[2] && ['s', 'm', 'l'].includes(path[2])) {
                                params.set('size', path[2]);
                            }
                        } else {
                            params.set('type', path[1]);
                        }
                    }
                }
            }

            const response = await fetch(`/api/media?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch media objects');
            }
            const data = await response.json();
            setMediaObjects(data);
        } catch (error) {
            console.error('Error fetching media objects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { mediaObjects, isLoading };
}
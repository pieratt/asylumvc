'use client';

import { useMediaObjects } from '../../hooks/useMediaObjects';
import MediaGrid from '../../components/MediaGrid';

export default function DynamicPage() {
    const { mediaObjects, isLoading } = useMediaObjects();

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
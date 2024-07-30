'use client';

import { useState, useEffect } from 'react';
import { MediaObject, User } from '@prisma/client';

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function Home() {
  const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
  const [filter, setFilter] = useState<{ behavior?: BehaviorType; size?: SizeType }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMediaObjects();
  }, [filter]);

  const fetchMediaObjects = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    const response = await fetch(`/api/media?${queryParams}`);
    const data = await response.json();
    setMediaObjects(data);
    setIsLoading(false);
  };

  const handleFilter = (key: 'behavior' | 'size', value: string | undefined) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AsylumVC Media Library</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="flex space-x-4">
          {(['read', 'look', 'listen'] as BehaviorType[]).map(behavior => (
            <button
              key={behavior}
              onClick={() => handleFilter('behavior', filter.behavior === behavior ? undefined : behavior)}
              className={`px-4 py-2 rounded ${filter.behavior === behavior ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {behavior.charAt(0).toUpperCase() + behavior.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-4 mt-4">
          {(['s', 'm', 'l'] as SizeType[]).map(size => (
            <button
              key={size}
              onClick={() => handleFilter('size', filter.size === size ? undefined : size)}
              className={`px-4 py-2 rounded ${filter.size === size ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaObjects.map(media => (
            <div key={media.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {media.image && (
                <img src={media.image} alt={media.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{media.title}</h3>
                <p className="text-gray-600 mb-2">{media.type}</p>
                <p className="text-sm text-gray-500">By {media.creator}</p>
                {media.duration && (
                  <p className="text-sm text-gray-500">Duration: {media.duration} min</p>
                )}
                <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                  View Content
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
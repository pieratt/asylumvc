'use client';

import { useState, useEffect } from 'react';
import { MediaObject, User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MediaGrid from '../components/MediaGrid';

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mediaObjects, setMediaObjects] = useState<MediaObject[]>([]);
  const [filter, setFilter] = useState<{ behavior?: BehaviorType; size?: SizeType }>({
    behavior: (searchParams.get('behavior') as BehaviorType) || undefined,
    size: (searchParams.get('size') as SizeType) || undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMediaObjects();
  }, [filter]);

  useEffect(() => {
    const behavior = searchParams.get('behavior') as BehaviorType;
    const size = searchParams.get('size') as SizeType;
    setFilter({ behavior, size });
  }, [searchParams]);

  const fetchMediaObjects = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    const response = await fetch(`/api/media?${queryParams}`);
    const data = await response.json();
    setMediaObjects(data);
    setIsLoading(false);
  };

  const handleFilter = (key: 'behavior' | 'size', value: string | undefined) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    const queryParams = new URLSearchParams(newFilter as Record<string, string>).toString();
    router.push(`/?${queryParams}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilter({});
    router.push('/', { scroll: false });
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
        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <MediaGrid mediaObjects={mediaObjects} />
      )}
    </div>
  );
}
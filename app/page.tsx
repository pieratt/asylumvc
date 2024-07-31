'use client';

import { useState, useEffect } from 'react';
import { User, MediaObject } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import MediaGrid from '../components/MediaGrid';

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [allMediaObjects, setAllMediaObjects] = useState<MediaObject[]>([]);
  const [filteredMediaObjects, setFilteredMediaObjects] = useState<MediaObject[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchAllMediaObjects();
  }, []);

  useEffect(() => {
    const user = searchParams.get('user');
    const behavior = searchParams.get('behavior') as BehaviorType | null;
    const size = searchParams.get('size') as SizeType | null;
    setSelectedUser(user);
    setSelectedBehavior(behavior);
    setSelectedSize(size);
  }, [searchParams]);

  useEffect(() => {
    filterMediaObjects();
  }, [allMediaObjects, selectedUser, selectedBehavior, selectedSize]);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const fetchAllMediaObjects = async () => {
    setIsLoading(true);
    const response = await fetch('/api/media');
    const data = await response.json();
    setAllMediaObjects(data);
    setIsLoading(false);
  };

  const filterMediaObjects = () => {
    let filtered = allMediaObjects;

    if (selectedUser) {
      filtered = filtered.filter(obj => obj.user.name === selectedUser);
    }

    if (selectedBehavior) {
      const behaviorTypes = {
        read: ['Book', 'Post', 'Quote', 'Tweet'],
        look: ['Art', 'Film', 'Tiktok', 'Youtube'],
        listen: ['Music', 'Podcast']
      };
      filtered = filtered.filter(obj => behaviorTypes[selectedBehavior].includes(obj.type));
    }

    if (selectedSize) {
      filtered = filtered.filter(obj => obj.size === selectedSize);
    }

    setFilteredMediaObjects(filtered);
  };

  const handleUserSelect = (username: string) => {
    updateURL(username === selectedUser ? null : username, selectedBehavior, selectedSize);
  };

  const handleBehaviorSelect = (behavior: BehaviorType) => {
    updateURL(selectedUser, behavior === selectedBehavior ? null : behavior, selectedSize);
  };

  const handleSizeSelect = (size: SizeType) => {
    updateURL(selectedUser, selectedBehavior, size === selectedSize ? null : size);
  };

  const updateURL = (user: string | null, behavior: BehaviorType | null, size: SizeType | null) => {
    const params = new URLSearchParams();
    if (user) params.set('user', user);
    if (behavior) params.set('behavior', behavior);
    if (size) params.set('size', size);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const behaviorTypes: BehaviorType[] = ['read', 'look', 'listen'];
  const sizeTypes: SizeType[] = ['s', 'm', 'l'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AsylumVC Media Library</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <div className="flex flex-wrap gap-2">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user.name)}
                className={`px-4 py-2 rounded ${selectedUser === user.name ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Behaviors</h3>
          <div className="flex flex-wrap gap-2">
            {behaviorTypes.map(behavior => (
              <button
                key={behavior}
                onClick={() => handleBehaviorSelect(behavior)}
                className={`px-4 py-2 rounded ${selectedBehavior === behavior ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {behavior.charAt(0).toUpperCase() + behavior.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizeTypes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 rounded ${selectedSize === size ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                {size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <MediaGrid mediaObjects={filteredMediaObjects} />
      )}
    </div>
  );
}
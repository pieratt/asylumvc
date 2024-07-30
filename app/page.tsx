'use client';

import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import MediaGrid from '../components/MediaGrid';

type BehaviorType = 'read' | 'look' | 'listen';
type SizeType = 's' | 'm' | 'l';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
    updateURL(username, selectedBehavior, selectedSize);
  };

  const handleBehaviorSelect = (behavior: BehaviorType) => {
    setSelectedBehavior(behavior === selectedBehavior ? null : behavior);
    updateURL(selectedUser, behavior === selectedBehavior ? null : behavior, selectedSize);
  };

  const handleSizeSelect = (size: SizeType) => {
    setSelectedSize(size === selectedSize ? null : size);
    updateURL(selectedUser, selectedBehavior, size === selectedSize ? null : size);
  };

  const updateURL = (user: string | null, behavior: BehaviorType | null, size: SizeType | null) => {
    let url = '/';
    if (user) url += `${user}/`;
    if (behavior) url += `${behavior}/`;
    if (size) url += `${size}`;
    router.push(url);
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

      <MediaGrid />
    </div>
  );
}
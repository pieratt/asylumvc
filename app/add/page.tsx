'use client';

import { useState, useEffect } from 'react';
import { User } from '@prisma/client';

type MediaType = 'Book' | 'Post' | 'Quote' | 'Tweet' | 'Art' | 'Film' | 'Tiktok' | 'Youtube' | 'Music' | 'Podcast';
// Useless comment to trigger a deployyy

export default function AddPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [mediaType, setMediaType] = useState<MediaType | ''>('');
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch users when component mounts
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted', { selectedUser, mediaType, title, creator, year, url, image, duration, comment });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <>
            <div>
              <label className="block mb-1">Media Type</label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as MediaType)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select media type</option>
                <option value="Book">Book</option>
                <option value="Post">Post</option>
                <option value="Quote">Quote</option>
                <option value="Tweet">Tweet</option>
                <option value="Art">Art</option>
                <option value="Film">Film</option>
                <option value="Tiktok">Tiktok</option>
                <option value="Youtube">Youtube</option>
                <option value="Music">Music</option>
                <option value="Podcast">Podcast</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Creator</label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Duration (in minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value ? parseFloat(e.target.value) : '')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              ></textarea>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add Content
            </button>
          </>
        )}
      </form>
    </div>
  );
}
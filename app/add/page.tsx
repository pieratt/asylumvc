'use client';

import { useState, useEffect } from 'react';
import { User } from '@prisma/client';

type MediaType = 'Book' | 'Post' | 'Quote' | 'Tweet' | 'Art' | 'Film' | 'Tiktok' | 'Youtube' | 'Music' | 'Podcast';

export default function AddPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    userId: '',
    type: '' as MediaType,
    title: '',
    creator: '',
    year: '',
    url: '',
    image: '',
    duration: '',
    comment: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dtccopacz/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.secure_url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Media object added successfully!');
        // Reset form or redirect
      } else {
        throw new Error('Failed to add media object');
      }
    } catch (error) {
      console.error('Error adding media object:', error);
      alert('Failed to add media object. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Add New Media</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {/* ... (other form fields remain the same) ... */}

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            className="mt-1 block w-full"
          />
        </div>

        {/* ... (rest of the form remains the same) ... */}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Media
          </button>
        </div>
      </form>
    </div>
  );
}
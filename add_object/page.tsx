// File: app/add_object/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { User, Collection, Category, Tag, Link, categories } from '../types';

const AddObjectPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchUsers();
    fetchCollections();
    fetchLinks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ text: 'Failed to load users. Please try again.', type: 'error' });
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/collections');
      if (!response.ok) throw new Error('Failed to fetch collections');
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setMessage({ text: 'Failed to load collections. Please try again.', type: 'error' });
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
      setMessage({ text: 'Failed to load links. Please try again.', type: 'error' });
    }
  };

  const handleLinkChange = (index: number, field: keyof Link, value: any) => {
    const updatedLinks = [...links];
    if (field === 'categories') {
      const categoryIndex = updatedLinks[index].categories.findIndex(cat => cat.name === value);
      if (categoryIndex > -1) {
        updatedLinks[index].categories.splice(categoryIndex, 1);
      } else {
        const category = categories.find(c => c.name === value);
        if (category) {
          updatedLinks[index].categories.push({
            id: category.id,
            name: category.name,
            icon: category.icon,
            links: []
          });
        }
      }
    } else if (field === 'tags') {
      updatedLinks[index].tags = value.split(',').map((tag: string) => ({
        id: 0, // Temporary ID, will be assigned by the database
        name: tag.trim(),
        links: []
      }));
    } else {
      updatedLinks[index] = {
        ...updatedLinks[index],
        [field]: field === 'user_id' || field === 'collectionId' || field === 'rank'
          ? Number(value)
          : value
      };
    }
    setLinks(updatedLinks);
  };

  const handleCollectionChange = (index: number, field: keyof Collection, value: any) => {
    const updatedCollections = [...collections];
    updatedCollections[index] = {
      ...updatedCollections[index],
      [field]: field === 'user_id' ? Number(value) : value
    };
    setCollections(updatedCollections);
  };

  const handleUserChange = (index: number, field: keyof User, value: any) => {
    const updatedUsers = [...users];
    if (field.startsWith('color')) {
      // Convert color names to hex
      const colorNameToHex: { [key: string]: string } = {
        red: "#FF0000", blue: "#0000FF", green: "#008000", yellow: "#FFFF00",
        orange: "#FFA500", purple: "#800080", cyan: "#00FFFF", magenta: "#FF00FF",
        lime: "#00FF00", pink: "#FFC0CB", teal: "#008080", lavender: "#E6E6FA"
      };
      value = colorNameToHex[value.toLowerCase()] || value;
      // Ensure color value is in correct format
      value = value.startsWith('#') ? value : `#${value}`;
      value = value.length === 4 ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value;
    }
    updatedUsers[index] = {
      ...updatedUsers[index],
      [field]: value
    };
    setUsers(updatedUsers);
  };

  const addNewRow = (stateUpdater: React.Dispatch<React.SetStateAction<any[]>>, initialState: any) => {
    stateUpdater(prev => [...prev, initialState]);
  };

  const saveLinks = async () => {
    try {
      console.log('Sending links data:', JSON.stringify(links, null, 2));
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(links),
      });
      if (!response.ok) throw new Error('Failed to save links');
      const savedLinks = await response.json();
      console.log('Received saved links:', JSON.stringify(savedLinks, null, 2));
      setMessage({ text: 'Links saved successfully', type: 'success' });
      setLinks(savedLinks);  // Update the state with the saved links
    } catch (error) {
      console.error('Error saving links:', error);
      setMessage({ text: 'Failed to save links. Please try again.', type: 'error' });
    }
  };

  const saveCollections = async () => {
    try {
      console.log('Sending collections data:', JSON.stringify(collections, null, 2));
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collections),
      });
      if (!response.ok) throw new Error('Failed to save collections');
      const savedCollections = await response.json();
      console.log('Received saved collections:', JSON.stringify(savedCollections, null, 2));
      setMessage({ text: 'Collections saved successfully', type: 'success' });
      setCollections(savedCollections);  // Update the state with the saved collections
    } catch (error) {
      console.error('Error saving collections:', error);
      setMessage({ text: 'Failed to save collections. Please try again.', type: 'error' });
    }
  };

  const saveUsers = async () => {
    try {
      console.log('Sending users data:', JSON.stringify(users, null, 2));
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      });
      if (!response.ok) throw new Error('Failed to save users');
      const savedUsers = await response.json();
      console.log('Received saved users:', JSON.stringify(savedUsers, null, 2));
      setMessage({ text: 'Users saved successfully', type: 'success' });
      setUsers(savedUsers);  // Update the state with the saved users
    } catch (error) {
      console.error('Error saving users:', error);
      setMessage({ text: 'Failed to save users. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add/Edit Objects</h1>

      {/* Links Table */}
      <h2 className="text-xl font-semibold mb-2">Links</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>URL</th>
            <th>Title</th>
            <th>User</th>
            <th>Collection</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Rank</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={link.id || `new-${index}`}>
              <td><input type="text" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} /></td>
              <td><input type="text" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)} /></td>
              <td>
                <select value={link.user_id} onChange={(e) => handleLinkChange(index, 'user_id', e.target.value)}>
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <select value={link.collectionId} onChange={(e) => handleLinkChange(index, 'collectionId', e.target.value)}>
                  <option value="">Select Collection</option>
                  {collections.map(collection => (
                    <option key={collection.id} value={collection.id}>{collection.title}</option>
                  ))}
                </select>
              </td>
              <td>
                {categories.map(category => (
                  <label key={category.name} className="block">
                    <input
                      type="checkbox"
                      checked={link.categories.some(c => c.name === category.name)}
                      onChange={() => handleLinkChange(index, 'categories', category.name)}
                    />
                    {category.icon} {category.name}
                  </label>
                ))}
              </td>
              <td><input type="text" value={link.tags.map(t => t.name).join(', ')} onChange={(e) => handleLinkChange(index, 'tags', e.target.value)} /></td>
              <td>
                {[1, 2, 3].map(rank => (
                  <label key={rank} className="block">
                    <input
                      type="radio"
                      checked={link.rank === rank}
                      onChange={() => handleLinkChange(index, 'rank', rank)}
                    />
                    {rank}
                  </label>
                ))}
              </td>
              <td><input type="text" value={link.comment} onChange={(e) => handleLinkChange(index, 'comment', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => addNewRow(setLinks, { categories: [], tags: [], rank: 1 })} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add New Link</button>
      <button onClick={saveLinks} className="bg-green-500 text-white px-4 py-2 rounded">Save Links</button>

      {/* Collections Table */}
      <h2 className="text-xl font-semibold mb-2 mt-8">Collections</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => (
            <tr key={collection.id || `new-${index}`}>
              <td><input type="text" value={collection.title} onChange={(e) => handleCollectionChange(index, 'title', e.target.value)} /></td>
              <td>
                <select value={collection.user_id} onChange={(e) => handleCollectionChange(index, 'user_id', e.target.value)}>
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </td>
              <td><input type="text" value={collection.comment} onChange={(e) => handleCollectionChange(index, 'comment', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => addNewRow(setCollections, {})} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add New Collection</button>
      <button onClick={saveCollections} className="bg-green-500 text-white px-4 py-2 rounded">Save Collections</button>

      {/* Users Table */}
      <h2 className="text-xl font-semibold mb-2 mt-8">Users</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>User ID</th>
            <th>Comment</th>
            <th>Colors</th>
            <th>Avatar</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || `new-${index}`}>
              <td><input type="text" value={user.name} onChange={(e) => handleUserChange(index, 'name', e.target.value)} /></td>
              <td><input type="text" value={user.user_id} onChange={(e) => handleUserChange(index, 'user_id', e.target.value)} /></td>
              <td><input type="text" value={user.comment} onChange={(e) => handleUserChange(index, 'comment', e.target.value)} /></td>
              <td>
                {['color1', 'color2', 'color3', 'color4', 'color5', 'color6'].map(color => (
                  <input key={color} type="color" value={user[color as keyof User] as string} onChange={(e) => handleUserChange(index, color as keyof User, e.target.value)} />
                ))}
              </td>
              <td><input type="text" value={user.avatar} onChange={(e) => handleUserChange(index, 'avatar', e.target.value)} /></td>
              <td><input type="text" value={user.header} onChange={(e) => handleUserChange(index, 'header', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => addNewRow(setUsers, {})} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add New User</button>
      <button onClick={saveUsers} className="bg-green-500 text-white px-4 py-2 rounded">Save Users</button>

      {message.text && (
        <div className={`mt-4 p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddObjectPage;
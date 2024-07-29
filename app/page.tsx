// File: app/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { User, Collection, Category, Tag, Link, categories, qualityOptions } from './types';

const MainPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchLinks();
    fetchCollections();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLinks(data);
      setFilteredLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
      setMessage({ text: 'Failed to load links. Please try again.', type: 'error' });
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

  const filterLinks = useCallback(() => {
    let updatedLinks = links;

    if (selectedCollection) {
      updatedLinks = updatedLinks.filter(link => link.collectionId === selectedCollection);
    }

    if (selectedCategories.length > 0) {
      updatedLinks = updatedLinks.filter(link =>
        link.categories.some(cat => selectedCategories.includes(cat.name))
      );
    }

    if (selectedQualities.length > 0) {
      updatedLinks = updatedLinks.filter(link =>
        selectedQualities.includes(getQualityFromRank(link.rank))
      );
    }

    if (selectedTags.length > 0) {
      updatedLinks = updatedLinks.filter(link =>
        link.tags.some(tag => selectedTags.includes(tag.name))
      );
    }

    setFilteredLinks(updatedLinks);
  }, [links, selectedCollection, selectedCategories, selectedQualities, selectedTags]);

  useEffect(() => {
    filterLinks();
  }, [filterLinks, selectedCollection, selectedCategories, selectedQualities, selectedTags]);

  const getQualityFromRank = (rank: number): string => {
    if (rank <= 1) return 'on deck';
    if (rank <= 2) return 'great';
    return 'canon';
  };

  const toggleFilter = (
    item: string,
    filterState: string[],
    setFilterState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFilterState(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Sidebar */}
        <nav className="w-80 p-4 border-r border-gray-200 flex flex-col">
          {/* Description */}
          <div className="mb-4 w-full">
            <h1 className="text-2xl font-bold mb-2">LinkLore</h1>
            <p>Discover and organize your favorite web content.</p>
          </div>

          {/* Two-column layout for Collections/Tags and Categories/Quality */}
          <div className="flex flex-row">
            {/* Left column: Collections and Tags */}
            <div className="flex-grow mr-2">
              {/* Collections */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Collections</h2>
                <ul className="list-none p-0">
                  {collections.map(collection => (
                    <li key={collection.id}>
                      <button
                        onClick={() => setSelectedCollection(selectedCollection === collection.id ? null : collection.id)}
                        className={`block mb-1 ${selectedCollection === collection.id ? 'font-bold' : 'font-normal'} bg-transparent border-none cursor-pointer text-left p-0`}
                      >
                        {collection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Tags</h2>
                {Array.from(new Set(links.flatMap(link => link.tags.map(tag => tag.name)))).map(tag => (
                  <NextLink
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFilter(tag, selectedTags, setSelectedTags);
                    }}
                    className={`block mb-1 ${selectedTags.includes(tag) ? 'font-bold' : 'font-normal'} bg-transparent border-none cursor-pointer text-left p-0`}
                  >
                    #{tag}
                  </NextLink>
                ))}
              </div>
            </div>

            {/* Right column: Categories and Quality */}
            <div className="w-1/3 ml-2">
              {/* Categories */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Categories</h2>
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => toggleFilter(category.name, selectedCategories, setSelectedCategories)}
                      className="mr-2"
                    />
                    <span>{category.icon} {category.name}</span>
                  </label>
                ))}
              </div>

              {/* Quality */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Quality</h2>
                {qualityOptions.map(({ name, icon }) => (
                  <label key={name} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedQualities.includes(name)}
                      onChange={() => toggleFilter(name, selectedQualities, setSelectedQualities)}
                      className="mr-2"
                    />
                    <span>{icon} {name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {filteredLinks.map(link => (
              <div key={link.id} className="bg-white p-4 rounded shadow-md border border-gray-200">
                <span>{link.categories.map(cat => cat.icon).join(' ')}</span>
                {' | '}
                <span>{qualityOptions.find(q => q.name === getQualityFromRank(link.rank))?.icon}</span>
                {' | '}
                {link.user && (
                  <NextLink href={`/user/${encodeURIComponent(link.user.name)}`} className="text-blue-600 hover:underline">
                    {link.user.name}
                  </NextLink>
                )}
                {!link.user && <span>Unknown User</span>}
                {' | '}
                <span className="font-bold">{link.title}</span>
                {' | '}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.url}</a>
                {' | '}
                <span>{link.comment}</span>
                {' | '}
                <span>{link.collection?.title}</span>
                {' | '}
                <span>{link.tags.map(tag => `#${tag.name}`).join(' ')}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};


export default MainPage;
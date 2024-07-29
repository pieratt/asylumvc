// File: app/user/[username]/page.tsx

'use client';

import { notFound } from 'next/navigation';
import { categories, User, Link } from '@/app/types';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

interface UserWithLinks extends User {
    links: Link[];
}

export default function UserPage({ params }: { params: { username: string } }) {
    const [user, setUser] = useState<UserWithLinks | null>(null);
    const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users/${encodeURIComponent(params.username)}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        notFound();
                    }
                    throw new Error(`Failed to fetch user: ${response.statusText}`);
                }
                const userData: UserWithLinks = await response.json();
                setUser(userData);
                setFilteredLinks(userData.links);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to load user data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [params.username]);

    useEffect(() => {
        if (!user) return;

        let filtered = user.links;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((link: Link) =>
                link.categories.some((cat) => selectedCategories.includes(cat.name))
            );
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter((link: Link) =>
                link.tags.some((tag) => selectedTags.includes(tag.name))
            );
        }

        if (selectedCollections.length > 0) {
            filtered = filtered.filter((link: Link) =>
                selectedCollections.includes(link.collection?.id || 0)
            );
        }

        setFilteredLinks(filtered);
    }, [user, selectedCategories, selectedTags, selectedCollections]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>No user data available.</div>;

    const userCategories = Array.from(new Set(user.links.flatMap((link) => link.categories.map((cat) => cat.name))));
    const userTags = Array.from(new Set(user.links.flatMap((link) => link.tags.map((tag) => tag.name))));


    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
            <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Left Sidebar */}
                <nav className="w-80 p-4 border-r border-gray-200 flex flex-col">
                    <div className="mb-4 w-full">
                        <h1 className="text-2xl font-bold mb-2">{user.name}&apos;s LinkLore</h1>
                        <p>{user.comment}</p>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex-grow mr-2">
                            {/* Collections */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Collections</h2>
                                <ul className="list-none p-0">
                                    {user.collections.map((collection) => (
                                        <li key={collection.id}>
                                            <button
                                                onClick={() => toggleFilter(collection.id, selectedCollections, setSelectedCollections)}
                                                className={selectedCollections.includes(collection.id) ? 'font-bold' : ''}
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
                                {userTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleFilter(tag, selectedTags, setSelectedTags)}
                                        className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''
                                            }`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-1/3 ml-2">
                            {/* Categories */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Categories</h2>
                                {categories.filter((cat) => userCategories.includes(cat.name)).map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => toggleFilter(category.name, selectedCategories, setSelectedCategories)}
                                        className={`flex items-center mb-1 ${selectedCategories.includes(category.name) ? 'font-bold' : ''
                                            }`}
                                    >
                                        <span>{category.icon} {category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {filteredLinks.map((link) => (
                            <div key={link.id} className="bg-white p-4 rounded shadow-md border border-gray-200">
                                <span>{link.categories.map((cat) => cat.icon).join(' ')}</span>
                                {' | '}
                                <span>{link.rank <= 1 ? '++' : link.rank <= 2 ? '+' : '...'}</span>
                                {' | '}
                                <span className="font-bold">{link.title}</span>
                                {' | '}
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.url}</a>
                                {' | '}
                                <span>{link.comment}</span>
                                {' | '}
                                <span>{link.collection?.title}</span>
                                {' | '}
                                <span>{link.tags.map((tag) => `#${tag.name}`).join(' ')}</span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

function toggleFilter<T>(item: T, filterState: T[], setFilterState: React.Dispatch<React.SetStateAction<T[]>>) {
    setFilterState((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
}
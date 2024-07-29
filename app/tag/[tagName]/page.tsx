'use client';

import { notFound } from 'next/navigation';
import { Tag, Link } from '@/app/types';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

interface TagWithLinks extends Tag {
    links: Link[];
}

export default function TagPage({ params }: { params: { tagName: string } }) {
    const [tag, setTag] = useState<TagWithLinks | null>(null);
    const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTag() {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/tags/${encodeURIComponent(params.tagName)}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        notFound();
                    }
                    throw new Error(`Failed to fetch tag: ${response.statusText}`);
                }
                const tagData: TagWithLinks = await response.json();
                setTag(tagData);
                setFilteredLinks(tagData.links);
            } catch (error) {
                console.error('Error fetching tag:', error);
                setError('Failed to load tag data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchTag();
    }, [params.tagName]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!tag) return <div>No tag data available.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tag: #{tag.name}</h1>
            <div className="space-y-4">
                {filteredLinks.map((link) => (
                    <div key={link.id} className="bg-white p-4 rounded shadow-md border border-gray-200">
                        <span>{link.categories.map(cat => cat.icon).join(' ')}</span>
                        {' | '}
                        <span>{link.rank <= 1 ? '++' : link.rank <= 2 ? '+' : '...'}</span>
                        {' | '}
                        {link.user ? (
                            <NextLink href={`/user/${encodeURIComponent(link.user.name)}`} className="text-blue-600 hover:underline">
                                {link.user.name}
                            </NextLink>
                        ) : (
                            <span>Unknown User</span>
                        )}
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
        </div>
    );
}
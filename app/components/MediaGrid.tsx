import { MediaObject } from '@prisma/client';

interface MediaGridProps {
    mediaObjects: MediaObject[];
}

export default function MediaGrid({ mediaObjects }: MediaGridProps) {
    return (
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
    );
}
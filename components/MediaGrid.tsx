import Image from 'next/image';
import { MediaObject, User } from '@prisma/client';
import { useState } from 'react';

type MediaObjectWithUser = MediaObject & { user: User };

export default function MediaGrid({ mediaObjects }: { mediaObjects: MediaObjectWithUser[] }) {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (id: string) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="grid grid-cols-4 gap-1">
            {mediaObjects.map(media => (
                <div key={media.id} className="aspect-square border border-gray-700 p-2 flex flex-col">
                    {media.image && !imageErrors[media.id] ? (
                        <div className="relative flex-grow">
                            <Image
                                src={media.image}
                                alt={media.title}
                                layout="fill"
                                objectFit="cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={() => handleImageError(media.id)}
                            />
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center bg-gray-200 text-gray-500">
                            Image not available
                        </div>
                    )}
                    <div className="mt-2">
                        <h3 className="text-sm font-semibold">{media.title}</h3>
                        <p className="text-xs text-gray-400">{media.creator}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
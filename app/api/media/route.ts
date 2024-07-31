import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const behavior = searchParams.get('behavior') as 'read' | 'look' | 'listen' | null;
    const size = searchParams.get('size') as 's' | 'm' | 'l' | null;
    const username = searchParams.get('username');
    const type = searchParams.get('type');

    const whereClause: any = {};

    if (behavior) {
        whereClause.type = {
            in: behavior === 'read' ? ['Book', 'Post', 'Quote', 'Tweet'] :
                behavior === 'look' ? ['Art', 'Film', 'Tiktok', 'Youtube'] :
                    behavior === 'listen' ? ['Music', 'Podcast'] : []
        };
    }

    if (size) {
        whereClause.size = size;
    }

    if (username) {
        whereClause.user = { name: username };
    }

    if (type) {
        whereClause.type = type;
    }

    try {
        const mediaObjects = await prisma.mediaObject.findMany({
            where: whereClause,
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(mediaObjects);
    } catch (error) {
        console.error('Failed to fetch media objects:', error);
        return NextResponse.json({ error: 'Failed to fetch media objects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            type,
            title,
            creator,
            year,
            url,
            image,
            size,
            comment,
            userId
        } = body;

        const newMediaObject = await prisma.mediaObject.create({
            data: {
                type,
                title,
                creator,
                year: year ? parseInt(year) : null,
                url,
                image,
                size,
                comment,
                userId
            }
        });

        return NextResponse.json(newMediaObject, { status: 201 });
    } catch (error) {
        console.error('Failed to create media object:', error);
        return NextResponse.json({ error: 'Failed to create media object' }, { status: 500 });
    }
}
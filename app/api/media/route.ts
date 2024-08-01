export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const behavior = searchParams.get('behavior') as 'read' | 'look' | 'listen' | null;
    const size = searchParams.get('size') as 's' | 'm' | 'l' | null;
    const username = searchParams.get('username');
    const type = searchParams.get('type');
    const year = searchParams.get('year');
    const creator = searchParams.get('creator');

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

    if (year) {
        whereClause.year = parseInt(year);
    }

    if (creator) {
        whereClause.creator = creator;
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
        console.log('Received POST request with body:', body); // For debugging

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

        console.log('Created new media object:', newMediaObject); // For debugging

        return NextResponse.json(newMediaObject, { status: 201 });
    } catch (error) {
        console.error('Failed to create media object:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Failed to create media object', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create media object' }, { status: 500 });
    }
}
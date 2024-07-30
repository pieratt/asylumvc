import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    const behavior = searchParams.get('behavior')
    const size = searchParams.get('size')

    let query: any = {}

    if (username) {
        query.user = { name: username }
    }

    if (behavior) {
        query.type = {
            in: behavior === 'read' ? ['Book', 'Post', 'Quote', 'Tweet'] :
                behavior === 'look' ? ['Art', 'Film', 'Tiktok', 'Youtube'] :
                    behavior === 'listen' ? ['Music', 'Podcast'] : []
        }
    }

    if (size) {
        let durationQuery
        switch (size) {
            case 's':
                durationQuery = { lt: 10 }
                break
            case 'm':
                durationQuery = { gte: 10, lt: 30 }
                break
            case 'l':
                durationQuery = { gte: 30 }
                break
        }
        if (durationQuery) {
            query.duration = durationQuery
        }
    }

    try {
        const mediaObjects = await prisma.mediaObject.findMany({
            where: query,
            include: { user: true },
        })

        return NextResponse.json(mediaObjects)
    } catch (error) {
        console.error('Request error', error)
        return NextResponse.json({ error: 'Error fetching media objects' }, { status: 500 })
    }
}
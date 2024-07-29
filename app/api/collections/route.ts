import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Collection } from '@/app/types';

export async function GET() {
  try {
    console.log('Fetching all collections');
    const collections = await prisma.collection.findMany({
      include: { user: true },
    });
    console.log(`Fetched ${collections.length} collections`);
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error in GET collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const collections = await request.json();
    console.log('Received collections data:', JSON.stringify(collections, null, 2));
    const updatedCollections = [];

    for (const collection of collections) {
      const { id, user_id, createdAt, ...collectionData } = collection;

      try {
        let updatedCollection;
        if (id) {
          console.log(`Updating existing collection with id ${id}`);
          updatedCollection = await prisma.collection.update({
            where: { id },
            data: {
              ...collectionData,
              user: { connect: { id: user_id } },
            },
            include: { user: true },
          });
        } else {
          console.log('Creating new collection');
          updatedCollection = await prisma.collection.create({
            data: {
              ...collectionData,
              user: { connect: { id: user_id } },
            },
            include: { user: true },
          });
        }
        console.log('Updated/Created collection:', JSON.stringify(updatedCollection, null, 2));
        updatedCollections.push(updatedCollection);
      } catch (error) {
        console.error(`Error processing collection ${id || 'new'}:`, error);
        updatedCollections.push({ error: `Failed to process collection: ${error instanceof Error ? error.message : 'Unknown error'}`, collection });
      }
    }

    console.log('Returning updated collections:', JSON.stringify(updatedCollections, null, 2));
    return NextResponse.json(updatedCollections);
  } catch (error) {
    console.error('Error in POST collections:', error);
    return NextResponse.json({ error: 'Failed to update collections', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
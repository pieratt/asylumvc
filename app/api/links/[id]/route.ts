// File: app/api/links/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Category, Tag } from '@/app/types';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const link = await prisma.link.findUnique({
      where: { id: Number(id) },
      include: { categories: true, tags: true, user: true, collection: true },
    });

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Failed to fetch link', details: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const links = await request.json();
    const updatedLinks = [];

    for (const link of links) {
      const { id, ...linkData } = link;

      try {
        let updatedLink;
        if (id) {
          // Update existing link
          updatedLink = await prisma.link.update({
            where: { id },
            data: {
              ...linkData,
              user: { connect: { id: linkData.user_id } },
              collection: linkData.collectionId ? { connect: { id: linkData.collectionId } } : { disconnect: true },
              categories: {
                set: [],
                connectOrCreate: linkData.categories.map((category: Category) => ({
                  where: { name: category.name },
                  create: { name: category.name, icon: category.icon },
                })),
              },
              tags: {
                set: [],
                connectOrCreate: linkData.tags.map((tag: Tag) => ({
                  where: { name: tag.name },
                  create: { name: tag.name },
                })),
              },
            },
            include: { categories: true, tags: true, user: true, collection: true },
          });
        } else {
          // Create new link
          updatedLink = await prisma.link.create({
            data: {
              ...linkData,
              user: { connect: { id: linkData.user_id } },
              collection: linkData.collectionId ? { connect: { id: linkData.collectionId } } : undefined,
              categories: {
                connectOrCreate: linkData.categories.map((category: Category) => ({
                  where: { name: category.name },
                  create: { name: category.name, icon: category.icon },
                })),
              },
              tags: {
                connectOrCreate: linkData.tags.map((tag: Tag) => ({
                  where: { name: tag.name },
                  create: { name: tag.name },
                })),
              },
            },
            include: { categories: true, tags: true, user: true, collection: true },
          });
        }
        updatedLinks.push(updatedLink);
      } catch (error) {
        console.error(`Error processing link ${id || 'new'}:`, error);
        updatedLinks.push({ error: `Failed to process link: ${error instanceof Error ? error.message : 'Unknown error'}`, link });
      }
    }

    return NextResponse.json(updatedLinks);
  } catch (error) {
    console.error('Error in POST links:', error);
    return NextResponse.json({ error: 'Failed to update links', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
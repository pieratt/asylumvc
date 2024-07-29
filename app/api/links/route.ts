import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Category, Tag, Link } from '@/app/types';  // Add this import

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      include: { categories: true, tags: true, user: true, collection: true },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error in GET links:', error);
    return NextResponse.json({ error: 'Failed to fetch links', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const links = await request.json();
    console.log('Received links data:', JSON.stringify(links, null, 2));
    const updatedLinks = [];

    for (const link of links) {
      const { id, user_id, collectionId, createdAt, ...linkData } = link;

      try {
        let updatedLink;
        if (id) {
          console.log(`Updating existing link with id ${id}`);
          updatedLink = await prisma.link.update({
            where: { id },
            data: {
              ...linkData,
              user: { connect: { id: user_id } },
              collection: collectionId ? { connect: { id: collectionId } } : { disconnect: true },
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
          console.log('Creating new link');
          updatedLink = await prisma.link.create({
            data: {
              ...linkData,
              user: { connect: { id: user_id } },
              collection: collectionId ? { connect: { id: collectionId } } : undefined,
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
        console.log('Updated/Created link:', JSON.stringify(updatedLink, null, 2));
        updatedLinks.push(updatedLink);
      } catch (error) {
        console.error(`Error processing link ${id || 'new'}:`, error);
        updatedLinks.push({ error: `Failed to process link: ${error instanceof Error ? error.message : 'Unknown error'}`, link });
      }
    }

    console.log('Returning updated links:', JSON.stringify(updatedLinks, null, 2));
    return NextResponse.json(updatedLinks);
  } catch (error) {
    console.error('Error in POST links:', error);
    return NextResponse.json({ error: 'Failed to update links', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
// File: app/api/collections/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { User } from '@/app/types';  // Add this import

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: Number(params.id) },
      include: { user: true, links: true },
    });
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    return NextResponse.json(collection);
  } catch (error) {
    console.error('Error in GET collection:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, comment, user_id } = await request.json();
    const updatedCollection = await prisma.collection.update({
      where: { id: Number(params.id) },
      data: {
        title,
        comment,
        user: user_id ? { connect: { id: Number(user_id) } } : undefined
      },
      include: { user: true, links: true },
    });
    return NextResponse.json(updatedCollection);
  } catch (error) {
    console.error('Error in PUT collection:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.collection.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}
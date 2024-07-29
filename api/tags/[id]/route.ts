// File: app/api/tags/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Tag } from '@/app/types';  // Add this import

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(params.id) },
    });
    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }
    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error in GET tag:', error);
    return NextResponse.json({ error: 'Failed to fetch tag' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await request.json();
    const updatedTag = await prisma.tag.update({
      where: { id: Number(params.id) },
      data: { name },
    });
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error('Error in PUT tag:', error);
    return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.tag.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE tag:', error);
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
  }
}
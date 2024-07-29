// File: app/api/tags/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Tag } from '@/app/types';  // Add this import

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error in GET tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const tag = await prisma.tag.create({
      data: { name },
    });
    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error in POST tag:', error);
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}
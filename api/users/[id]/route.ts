// File: app/api/users/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log('Fetching user with id:', params.id);
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: isNaN(Number(params.id)) ? undefined : Number(params.id) },
          { user_id: params.id },
          { name: params.id }
        ]
      },
      include: {
        links: {
          include: {
            categories: true,
            tags: true,
            collection: true,
          }
        },
        collections: true,
      },
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user.name);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({
      error: 'Failed to fetch user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, comment, color1, color2, color3, color4, color5, color6, avatar, header } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        name,
        comment,
        color1,
        color2,
        color3,
        color4,
        color5,
        color6,
        avatar,
        header,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error in PUT user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
// File: app/api/users/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { User } from '@/app/types';

export async function GET() {
  try {
    console.log('Fetching all users');
    const users = await prisma.user.findMany({
      include: { collections: true, links: true },
    });
    console.log(`Fetched ${users.length} users`);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET users:', error);
    return NextResponse.json({ error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const users = await request.json();
    console.log('Received users data:', JSON.stringify(users, null, 2));
    const updatedUsers = [];

    for (const user of users) {
      const { id, collections, links, createdAt, ...userData } = user;

      try {
        let updatedUser;
        if (id) {
          console.log(`Updating existing user with id ${id}`);
          updatedUser = await prisma.user.update({
            where: { id },
            data: userData,
            include: { collections: true, links: true },
          });
        } else {
          console.log('Creating new user');
          updatedUser = await prisma.user.create({
            data: userData,
            include: { collections: true, links: true },
          });
        }
        console.log('Updated/Created user:', JSON.stringify(updatedUser, null, 2));
        updatedUsers.push(updatedUser);
      } catch (error) {
        console.error(`Error processing user ${id || 'new'}:`, error);
        updatedUsers.push({ error: `Failed to process user: ${error instanceof Error ? error.message : 'Unknown error'}`, user });
      }
    }

    console.log('Returning updated users:', JSON.stringify(updatedUsers, null, 2));
    return NextResponse.json(updatedUsers);
  } catch (error) {
    console.error('Error in POST users:', error);
    return NextResponse.json({ error: 'Failed to update users', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
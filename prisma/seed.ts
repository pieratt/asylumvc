import { PrismaClient } from '@prisma/client';
import { categories as predefinedCategories } from '../app/types';

const prisma = new PrismaClient();

async function main() {
  // check if data already exists
  const usersCount = await prisma.user.count();
  const linksCount = await prisma.link.count();
  const collectionsCount = await prisma.collection.count();
  const tagsCount = await prisma.tag.count();
  const categoriesCount = await prisma.category.count();

  if (usersCount === 0 && linksCount === 0 && collectionsCount === 0 && tagsCount === 0 && categoriesCount === 0) {
    console.log('No existing data found, seeding the database...');

    // create categories
    const createdCategories = await Promise.all(
      predefinedCategories.map(category =>
        prisma.category.create({
          data: { name: category.name, icon: category.icon },
        })
      )
    );

    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category;
      return map;
    }, {} as Record<string, any>);

    // create tags
    const tag1 = await prisma.tag.create({
      data: { name: 'tag1' },
    });
    const tag2 = await prisma.tag.create({
      data: { name: 'tag2' },
    });

    // create users
    const user1 = await prisma.user.create({
      data: {
        user_id: 'user1',
        name: 'Alice',
        comment: 'First user',
        color1: 'red',
        color2: 'blue',
        color3: 'green',
        color4: 'yellow',
        color5: 'orange',
        color6: 'purple',
        avatar: 'https://example.com/avatar1.png',
        header: 'https://example.com/header1.png',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        user_id: 'user2',
        name: 'Bob',
        comment: 'Second user',
        color1: 'cyan',
        color2: 'magenta',
        color3: 'lime',
        color4: 'pink',
        color5: 'teal',
        color6: 'lavender',
        avatar: 'https://example.com/avatar2.png',
        header: 'https://example.com/header2.png',
      },
    });

    // create collections
    const collection1 = await prisma.collection.create({
      data: {
        user_id: user1.id,
        title: 'Alice Collection 1',
        comment: 'First collection of Alice',
      },
    });

    const collection2 = await prisma.collection.create({
      data: {
        user_id: user2.id,
        title: 'Bob Collection 1',
        comment: 'First collection of Bob',
      },
    });

    // create links
    const link1 = await prisma.link.create({
      data: {
        user_id: user1.id,
        url: 'https://example.com/link1',
        title: 'Link 1',
        comment: 'First link',
        rank: 1,
        collectionId: collection1.id,
        tags: {
          connect: [{ id: tag1.id }, { id: tag2.id }],
        },
        categories: {
          connect: [{ id: categoryMap['Read'].id }, { id: categoryMap['Learn'].id }],
        },
      },
    });

    const link2 = await prisma.link.create({
      data: {
        user_id: user2.id,
        url: 'https://example.com/link2',
        title: 'Link 2',
        comment: 'Second link',
        rank: 2,
        collectionId: collection2.id,
        tags: {
          connect: [{ id: tag1.id }],
        },
        categories: {
          connect: [{ id: categoryMap['Watch'].id }, { id: categoryMap['Listen'].id }],
        },
      },
    });

    console.log('Database seeded successfully.');
  } else {
    console.log('Existing data found, skipping seeding.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
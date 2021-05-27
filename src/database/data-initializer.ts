import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//@Injectable()
export class DataInitializer implements OnModuleInit {
  //
  constructor(private readonly prisma: PrismaService) {
    console.log('prisma client:', prisma);
  }
  //
  async onModuleInit() {
    console.log('data initialization...');
    const alice = await this.prisma.user.upsert({
      where: { email: 'alice@prisma.io' },
      update: {},
      create: {
        email: `alice@prisma.io`,
        name: 'Alice',
        posts: {
          create: {
            title: 'Check out Prisma with Next.js',
            content: 'https://www.prisma.io/nextjs',
            comments: {
              create: {
                content: 'test comments',
              },
            },
          },
        },
      },
    });

    const bob = await this.prisma.user.upsert({
      where: { email: 'bob@prisma.io' },
      update: {},
      create: {
        email: `bob@prisma.io`,
        name: 'Bob',
        posts: {
          create: [
            {
              title: 'Follow Prisma on Twitter',
              content: 'https://twitter.com/prisma',
            },
            {
              title: 'Follow Nexus on Twitter',
              content: 'https://twitter.com/nexusgql',
            },
          ],
        },
      },
    });
    console.log('saved data:', { alice, bob });
  }
}

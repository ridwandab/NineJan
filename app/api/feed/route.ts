import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Get users that current user is following
    const following = await prisma.follower.findMany({
      where: { followerId: user.userId },
      select: { followingId: true },
    });

    const followingIds = following.map(f => f.followingId);

    // Get posts from followed users and current user
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [...followingIds, user.userId],
        },
      },
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatarUrl: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Get feed error:', error);
    return NextResponse.json(
      { error: 'Failed to get feed' },
      { status: 500 }
    );
  }
}


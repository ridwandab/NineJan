import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.userId,
          postId: params.id,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.userId,
            postId: params.id,
          },
        },
      });

      return NextResponse.json({ message: 'Unliked successfully' });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: user.userId,
          postId: params.id,
        },
      });

      // Create notification
      if (post.authorId !== user.userId) {
        await prisma.notification.create({
          data: {
            userId: post.authorId,
            type: 'like',
            data: JSON.stringify({
              userId: user.userId,
              postId: params.id,
            }),
          },
        });
      }

      return NextResponse.json({ message: 'Liked successfully' });
    }
  } catch (error) {
    console.error('Like/unlike error:', error);
    return NextResponse.json(
      { error: 'Failed to like/unlike' },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username } = await params;
    const targetUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (targetUser.id === currentUser.userId) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.userId,
          followingId: targetUser.id,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follower.delete({
        where: {
          followerId_followingId: {
            followerId: currentUser.userId,
            followingId: targetUser.id,
          },
        },
      });

      return NextResponse.json({ message: 'Unfollowed successfully' });
    } else {
      // Follow
      await prisma.follower.create({
        data: {
          followerId: currentUser.userId,
          followingId: targetUser.id,
        },
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId: targetUser.id,
          type: 'follow',
          data: JSON.stringify({
            userId: currentUser.userId,
            username: currentUser.userId,
          }),
        },
      });

      return NextResponse.json({ message: 'Followed successfully' });
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error);
    return NextResponse.json(
      { error: 'Failed to follow/unfollow' },
      { status: 500 }
    );
  }
}


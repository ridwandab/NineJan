import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/?error=access_denied', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser = await userResponse.json();

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    // Create user if doesn't exist
    if (!dbUser) {
      const username = googleUser.email.split('@')[0] + Math.floor(Math.random() * 1000);
      
      dbUser = await prisma.user.create({
        data: {
          email: googleUser.email,
          username: username,
          name: googleUser.name,
          avatarUrl: googleUser.picture,
          password: '', // No password for OAuth users
        },
      });
    } else {
      // Update user info
      await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          name: googleUser.name || dbUser.name,
          avatarUrl: googleUser.picture || dbUser.avatarUrl,
        },
      });
    }

    // Generate our JWT tokens
    const accessToken = generateAccessToken({ userId: dbUser.id, email: dbUser.email });
    const refreshToken = generateRefreshToken({ userId: dbUser.id, email: dbUser.email });

    // Create response and set tokens
    const response = NextResponse.redirect(new URL('/feed', request.url));
    
    // Set tokens in cookies
    response.cookies.set('ninejan_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set('ninejan_refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store user info in localStorage via client-side redirect
    const redirectUrl = new URL('/feed', request.url);
    redirectUrl.searchParams.set('token', accessToken);
    redirectUrl.searchParams.set('user', JSON.stringify({
      id: dbUser.id,
      email: dbUser.email,
      username: dbUser.username,
      name: dbUser.name,
      avatarUrl: dbUser.avatarUrl,
    }));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_failed', request.url));
  }
}


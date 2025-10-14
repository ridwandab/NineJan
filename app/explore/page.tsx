'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPosts } from '@/lib/api';
import Navigation from '@/components/layout/Navigation';
import PostCard from '@/components/feed/PostCard';

export default function ExplorePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ninejan_token');
    if (!token) {
      router.push('/');
      return;
    }

    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No posts found</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}


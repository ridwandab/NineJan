'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFeed } from '@/lib/api';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import Navigation from '@/components/layout/Navigation';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ninejan_token');
    if (!token) {
      router.push('/');
      return;
    }

    loadFeed();
  }, [router]);

  const loadFeed = async () => {
    try {
      const data = await getFeed(page);
      if (page === 1) {
        setPosts(data);
      } else {
        setPosts([...posts, ...data]);
      }
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (post: any) => {
    setPosts([post, ...posts]);
  };

  const handlePostUpdate = (updatedPost: any) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handlePostDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
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
        <CreatePost onPostCreated={handleNewPost} />
        
        <div className="mt-6 space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No posts yet</p>
              <p className="text-sm mt-2">Follow some users to see their posts in your feed!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={handlePostUpdate}
                onDelete={handlePostDelete}
              />
            ))
          )}
        </div>

        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setPage(page + 1);
                loadFeed();
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


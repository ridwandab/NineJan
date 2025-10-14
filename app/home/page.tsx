'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFeed, getPosts } from '@/lib/api';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import Navigation from '@/components/layout/Navigation';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'feed' | 'explore'>('feed');
  const router = useRouter();

  useEffect(() => {
    // Check for token in URL params (from OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (tokenParam && userParam) {
      // Save token and user info to localStorage
      localStorage.setItem('ninejan_token', tokenParam);
      localStorage.setItem('ninejan_user', userParam);
      
      // Remove token and user from URL
      window.history.replaceState({}, '', '/home');
    }

    const token = localStorage.getItem('ninejan_token');
    if (!token) {
      router.push('/');
      return;
    }

    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      if (activeTab === 'feed') {
        const data = await getFeed(page);
        if (page === 1) {
          setPosts(data);
        } else {
          setPosts([...posts, ...data]);
        }
      } else {
        const data = await getPosts(page);
        if (page === 1) {
          setPosts(data);
        } else {
          setPosts([...posts, ...data]);
        }
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) {
      loadPosts();
    }
  }, [activeTab]);

  const handleNewPost = (post: any) => {
    setPosts([post, ...posts]);
  };

  const handlePostUpdate = (updatedPost: any) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handlePostDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleTabChange = (tab: 'feed' | 'explore') => {
    setActiveTab(tab);
    setPage(1);
    setPosts([]);
    setLoading(true);
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
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('feed')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'feed'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => handleTabChange('explore')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'explore'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Explore
          </button>
        </div>

        {/* Create Post */}
        {activeTab === 'feed' && <CreatePost onPostCreated={handleNewPost} />}
        
        {/* Posts */}
        <div className="mt-6 space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No posts yet</p>
              <p className="text-sm mt-2">
                {activeTab === 'feed' 
                  ? 'Follow some users to see their posts in your feed!'
                  : 'No posts available at the moment.'
                }
              </p>
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

        {/* Load More */}
        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setPage(page + 1);
                loadPosts();
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


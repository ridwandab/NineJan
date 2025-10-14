'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, followUser } from '@/lib/api';
import Navigation from '@/components/layout/Navigation';
import PostCard from '@/components/feed/PostCard';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, [params.username]);

  const loadProfile = async () => {
    try {
      const userData = await getUser(params.username);
      setUser(userData);
      
      // Load user's posts
      const postsData = await fetch(`/api/posts?authorId=${userData.id}`).then(r => r.json());
      setPosts(postsData);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await followUser(params.username);
      setFollowing(!following);
    } catch (error) {
      console.error('Failed to follow/unfollow:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  const currentUser = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('ninejan_user') || '{}')
    : null;

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-700"></div>
          
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-16">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold text-primary-600">
                {user.name?.[0] || user.username[0].toUpperCase()}
              </div>
              
              <div className="ml-6 flex-1">
                <h1 className="text-3xl font-bold">{user.name || user.username}</h1>
                <p className="text-gray-600">@{user.username}</p>
                
                {user.bio && (
                  <p className="mt-2 text-gray-700">{user.bio}</p>
                )}
                
                <div className="flex items-center space-x-6 mt-4">
                  <div>
                    <span className="font-semibold">{posts.length}</span>
                    <span className="text-gray-600 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user._count?.followers || 0}</span>
                    <span className="text-gray-600 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user._count?.following || 0}</span>
                    <span className="text-gray-600 ml-1">Following</span>
                  </div>
                </div>
              </div>

              {!isOwnProfile && (
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    following
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
              )}

              {isOwnProfile && (
                <button
                  onClick={() => router.push('/settings')}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-6 space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No posts yet</p>
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


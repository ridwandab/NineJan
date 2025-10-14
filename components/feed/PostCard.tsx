'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { likePost, deletePost } from '@/lib/api';
import Image from 'next/image';

interface PostCardProps {
  post: any;
  onUpdate: (post: any) => void;
  onDelete: (postId: string) => void;
}

export default function PostCard({ post, onUpdate, onDelete }: PostCardProps) {
  const [liked, setLiked] = useState(post.likes?.length > 0);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [commentsCount] = useState(post.comments?.length || 0);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const currentUser = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('ninejan_user') || '{}')
    : null;

  const isOwner = currentUser?.id === post.author.id;

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    try {
      await deletePost(post.id);
      onDelete(post.id);
    } catch (error) {
      console.error('Failed to delete post:', error);
      setDeleting(false);
    }
  };

  const images = post.images ? JSON.parse(post.images) : [];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push(`/profile/${post.author.username}`)}
          >
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.author.name?.[0] || post.author.username[0].toUpperCase()}
            </div>
            <div>
              <div className="font-semibold">{post.author.name || post.author.username}</div>
              <div className="text-sm text-gray-500">@{post.author.username}</div>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-500 hover:text-red-700 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

        {images.length > 0 && (
          <div className={`mt-4 grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {images.map((image: string, index: number) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-600`}
          >
            <svg className="w-6 h-6" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => router.push(`/posts/${post.id}`)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{commentsCount}</span>
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}


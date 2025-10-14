'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPost, addComment, likePost } from '@/lib/api';
import Navigation from '@/components/layout/Navigation';
import Image from 'next/image';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => {
      setPostId(id);
    });
  }, [params]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      const postData = await getPost(postId);
      setPost(postData);
      setComments(postData.comments || []);
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const comment = await addComment(postId, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      await likePost(post.id);
      // Optimistically update like count
      setPost({
        ...post,
        likes: post.likes?.length > 0 ? [] : [{ userId: 'current' }],
      });
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Post not found</div>
      </div>
    );
  }

  const images = post.images ? JSON.parse(post.images) : [];
  const liked = post.likes?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back
        </button>

        {/* Post */}
        <div className="bg-white rounded-lg shadow mb-6">
          {/* Header */}
          <div className="p-4 border-b">
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
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                liked ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-600`}
            >
              <svg className="w-6 h-6" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likes?.length || 0}</span>
            </button>

            <div className="mt-2 text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-4">Comments ({comments.length})</h2>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="mt-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {comment.author.name?.[0] || comment.author.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="font-semibold text-sm">{comment.author.name || comment.author.username}</div>
                      <p className="text-gray-800">{comment.content}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


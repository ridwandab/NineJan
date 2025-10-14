# NineJan - Social Media App

A modern, full-stack social media application built with Next.js 15, TypeScript, Prisma, and SQLite.

## Features

- 🔐 **Authentication**: Email/password registration and login with JWT tokens
- 👤 **User Profiles**: Customizable profiles with avatars, bios, and cover images
- 📝 **Posts**: Create text posts with multiple image uploads
- ❤️ **Interactions**: Like posts and add comments
- 👥 **Follow System**: Follow/unfollow other users
- 🔔 **Notifications**: Real-time notifications for likes, comments, and follows
- 🔍 **Search**: Search for users and posts
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (access + refresh tokens)
- **File Upload**: Local file storage
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ninejan-apk
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the following variables:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_super_secret_jwt_key_here"
JWT_REFRESH_SECRET="your_super_secret_refresh_key_here"
```

**Important**: Generate strong random strings for JWT secrets in production!

4. **Set up the database**

```bash
npm run db:generate
npm run db:push
```

This will:
- Generate the Prisma client
- Create the SQLite database file
- Run the database migrations

5. **Start the development server**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ninejan-apk/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── users/           # User management endpoints
│   │   ├── posts/           # Post endpoints
│   │   ├── feed/            # Feed endpoint
│   │   ├── notifications/   # Notifications endpoint
│   │   └── search/          # Search endpoint
│   ├── feed/                # Feed page
│   ├── explore/             # Explore page
│   ├── profile/             # Profile pages
│   ├── posts/               # Post detail pages
│   ├── settings/            # Settings page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home/Login page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── auth/                # Authentication components
│   ├── feed/                # Feed components
│   └── layout/              # Layout components
├── lib/                     # Utility libraries
│   ├── api.ts              # API client
│   ├── auth.ts             # JWT utilities
│   ├── prisma.ts           # Prisma client
│   └── upload.ts           # File upload utilities
├── prisma/                  # Prisma configuration
│   └── schema.prisma       # Database schema
├── public/                  # Static files
└── uploads/                 # User-uploaded files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/users/:username` - Get user by username
- `POST /api/users/:username/follow` - Follow/unfollow user
- `GET /api/users/:username/followers` - Get user's followers
- `GET /api/users/:username/following` - Get user's following

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/unlike a post
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Add a comment

### Feed
- `GET /api/feed` - Get personalized feed

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications` - Mark notifications as read

### Search
- `GET /api/search?q=query` - Search users and posts

## Database Schema

The application uses the following main models:

- **User**: User accounts with profiles
- **Post**: User posts with text and images
- **Like**: Post likes
- **Comment**: Post comments
- **Follower**: Follow relationships
- **Notification**: User notifications

## Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Run migrations (if using migrations)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The application will automatically deploy on every push to the main branch.

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL` - Your production database URL
- `JWT_SECRET` - A strong random secret for JWT
- `JWT_REFRESH_SECRET` - A strong random secret for refresh tokens
- `NODE_ENV` - Set to `production`

## Security Considerations

- ✅ Passwords are hashed using bcrypt
- ✅ JWT tokens with expiration
- ✅ Refresh token rotation
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma)
- ⚠️ HTTPS required in production
- ⚠️ Rate limiting recommended for production
- ⚠️ Email verification recommended for production

## Future Enhancements

- [ ] Email verification
- [ ] Password reset flow
- [ ] Direct messaging
- [ ] Real-time notifications with WebSockets
- [ ] Image optimization and CDN
- [ ] Advanced search filters
- [ ] Post privacy settings
- [ ] Story feature
- [ ] Video posts
- [ ] Admin dashboard

## License

MIT License - feel free to use this project for learning or as a starting point for your own social media app!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15 and TypeScript


# Quick Start Guide - NineJan

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Create database and tables
npm run db:push
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎉 You're Ready!

### First Steps:

1. **Create an Account**
   - Click "Sign up" on the homepage
   - Enter your email, username, and password
   - Click "Sign Up"

2. **Create Your First Post**
   - After logging in, you'll see the feed
   - Click in the "What's on your mind?" box
   - Type your post and optionally add photos (up to 4)
   - Click "Post"

3. **Explore**
   - Use the navigation bar to:
     - **Feed**: See posts from users you follow
     - **Explore**: Browse all posts
     - **Profile**: View and edit your profile

4. **Follow Users**
   - Visit any user's profile
   - Click "Follow" to see their posts in your feed

## 📱 Features to Try

- ✨ **Create Posts**: Share text and images
- ❤️ **Like Posts**: Click the heart icon
- 💬 **Comment**: Click on a post to view and add comments
- 👥 **Follow Users**: Visit profiles and click "Follow"
- 🔍 **Search**: Use the search bar to find users and posts
- ⚙️ **Settings**: Click your profile → "Edit Profile"

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio (database GUI)

# Other
npm run lint             # Run ESLint
```

## 📁 Project Structure

```
ninejan-apk/
├── app/                 # Pages and API routes
│   ├── api/            # Backend API endpoints
│   ├── feed/           # Feed page
│   ├── explore/        # Explore page
│   └── profile/        # Profile pages
├── components/         # React components
├── lib/               # Utilities and helpers
├── prisma/            # Database schema
└── public/            # Static files
```

## 🔧 Troubleshooting

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npm run db:push
```

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out the API documentation for backend endpoints
- Customize the design in `tailwind.config.ts`
- Add new features and make it your own!

## 💡 Tips

1. **Use Prisma Studio** to view your database:
   ```bash
   npm run db:studio
   ```

2. **Check the Console** for helpful error messages

3. **Hot Reload**: Changes to your code will automatically refresh the page

4. **Environment Variables**: Edit `.env` to customize settings

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Logo**: Replace the "NineJan" text in components
- **Features**: Add new pages in the `app/` directory

---

**Need Help?** Check the [README.md](README.md) or open an issue on GitHub.

Happy coding! 🚀


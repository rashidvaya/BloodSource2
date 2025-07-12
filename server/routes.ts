import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPostSchema, insertStorySchema, insertFriendRequestSchema, insertCommentSchema, insertLikeSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
        isVerified: true, // Auto-verify for demo
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          profileImage: user.profileImage,
          isStaff: user.isStaff,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          profileImage: user.profileImage,
          isStaff: user.isStaff,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ message: 'Login failed' });
    }
  });

  app.get('/api/auth/me', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profileImage: user.profileImage,
        isStaff: user.isStaff,
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Failed to get user' });
    }
  });

  // Posts routes
  app.post('/api/posts', authenticateToken, async (req: any, res) => {
    try {
      const postData = insertPostSchema.parse({
        ...req.body,
        authorId: req.user.id,
      });

      const post = await storage.createPost(postData);
      
      // Get post with author info
      const author = await storage.getUser(post.authorId);
      const postWithAuthor = {
        ...post,
        author: author ? {
          id: author.id,
          fullName: author.fullName,
          profileImage: author.profileImage,
        } : null,
      };

      res.status(201).json(postWithAuthor);
    } catch (error) {
      console.error('Create post error:', error);
      res.status(400).json({ message: 'Failed to create post' });
    }
  });

  app.get('/api/posts', authenticateToken, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const posts = await storage.getPosts(limit, offset);
      
      // Get author info for each post
      const postsWithAuthors = await Promise.all(
        posts.map(async (post) => {
          const author = await storage.getUser(post.authorId);
          return {
            ...post,
            author: author ? {
              id: author.id,
              fullName: author.fullName,
              profileImage: author.profileImage,
            } : null,
          };
        })
      );

      res.json(postsWithAuthors);
    } catch (error) {
      console.error('Get posts error:', error);
      res.status(500).json({ message: 'Failed to get posts' });
    }
  });

  app.get('/api/posts/user/:userId', authenticateToken, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = parseInt(req.query.limit as string) || 20;
      
      const posts = await storage.getPostsByUser(userId, limit);
      res.json(posts);
    } catch (error) {
      console.error('Get user posts error:', error);
      res.status(500).json({ message: 'Failed to get user posts' });
    }
  });

  // Stories routes
  app.post('/api/stories', authenticateToken, async (req: any, res) => {
    try {
      const storyData = insertStorySchema.parse({
        ...req.body,
        authorId: req.user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      });

      const story = await storage.createStory(storyData);
      res.status(201).json(story);
    } catch (error) {
      console.error('Create story error:', error);
      res.status(400).json({ message: 'Failed to create story' });
    }
  });

  app.get('/api/stories', authenticateToken, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const stories = await storage.getActiveStories(limit);
      
      // Get author info for each story
      const storiesWithAuthors = await Promise.all(
        stories.map(async (story) => {
          const author = await storage.getUser(story.authorId);
          return {
            ...story,
            author: author ? {
              id: author.id,
              fullName: author.fullName,
              profileImage: author.profileImage,
            } : null,
          };
        })
      );

      res.json(storiesWithAuthors);
    } catch (error) {
      console.error('Get stories error:', error);
      res.status(500).json({ message: 'Failed to get stories' });
    }
  });

  // Friend requests routes
  app.post('/api/friend-requests', authenticateToken, async (req: any, res) => {
    try {
      const requestData = insertFriendRequestSchema.parse({
        ...req.body,
        senderId: req.user.id,
      });

      // Check if already friends or request exists
      const existingRequest = await storage.getSentFriendRequests(req.user.id);
      const alreadyRequested = existingRequest.some(r => r.receiverId === requestData.receiverId);
      
      if (alreadyRequested) {
        return res.status(400).json({ message: 'Friend request already sent' });
      }

      const areFriends = await storage.areFriends(req.user.id, requestData.receiverId);
      if (areFriends) {
        return res.status(400).json({ message: 'Already friends' });
      }

      const friendRequest = await storage.sendFriendRequest(requestData);
      res.status(201).json(friendRequest);
    } catch (error) {
      console.error('Send friend request error:', error);
      res.status(400).json({ message: 'Failed to send friend request' });
    }
  });

  app.get('/api/friend-requests', authenticateToken, async (req: any, res) => {
    try {
      const requests = await storage.getFriendRequests(req.user.id);
      
      // Get sender info for each request
      const requestsWithSenders = await Promise.all(
        requests.map(async (request) => {
          const sender = await storage.getUser(request.senderId);
          return {
            ...request,
            sender: sender ? {
              id: sender.id,
              fullName: sender.fullName,
              profileImage: sender.profileImage,
            } : null,
          };
        })
      );

      res.json(requestsWithSenders);
    } catch (error) {
      console.error('Get friend requests error:', error);
      res.status(500).json({ message: 'Failed to get friend requests' });
    }
  });

  app.post('/api/friend-requests/:id/accept', authenticateToken, async (req: any, res) => {
    try {
      const requestId = parseInt(req.params.id);
      await storage.acceptFriendRequest(requestId);
      res.json({ message: 'Friend request accepted' });
    } catch (error) {
      console.error('Accept friend request error:', error);
      res.status(500).json({ message: 'Failed to accept friend request' });
    }
  });

  app.post('/api/friend-requests/:id/reject', authenticateToken, async (req: any, res) => {
    try {
      const requestId = parseInt(req.params.id);
      await storage.rejectFriendRequest(requestId);
      res.json({ message: 'Friend request rejected' });
    } catch (error) {
      console.error('Reject friend request error:', error);
      res.status(500).json({ message: 'Failed to reject friend request' });
    }
  });

  // Friends routes
  app.get('/api/friends', authenticateToken, async (req: any, res) => {
    try {
      const friends = await storage.getFriends(req.user.id);
      res.json(friends.map(friend => ({
        id: friend.id,
        fullName: friend.fullName,
        profileImage: friend.profileImage,
        username: friend.username,
      })));
    } catch (error) {
      console.error('Get friends error:', error);
      res.status(500).json({ message: 'Failed to get friends' });
    }
  });

  // Comments routes
  app.post('/api/comments', authenticateToken, async (req: any, res) => {
    try {
      const commentData = insertCommentSchema.parse({
        ...req.body,
        authorId: req.user.id,
      });

      const comment = await storage.createComment(commentData);
      
      // Get comment with author info
      const author = await storage.getUser(comment.authorId);
      const commentWithAuthor = {
        ...comment,
        author: author ? {
          id: author.id,
          fullName: author.fullName,
          profileImage: author.profileImage,
        } : null,
      };

      res.status(201).json(commentWithAuthor);
    } catch (error) {
      console.error('Create comment error:', error);
      res.status(400).json({ message: 'Failed to create comment' });
    }
  });

  app.get('/api/comments/post/:postId', authenticateToken, async (req: any, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getCommentsByPost(postId);
      
      // Get author info for each comment
      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          const author = await storage.getUser(comment.authorId);
          return {
            ...comment,
            author: author ? {
              id: author.id,
              fullName: author.fullName,
              profileImage: author.profileImage,
            } : null,
          };
        })
      );

      res.json(commentsWithAuthors);
    } catch (error) {
      console.error('Get comments error:', error);
      res.status(500).json({ message: 'Failed to get comments' });
    }
  });

  // Likes routes
  app.post('/api/likes', authenticateToken, async (req: any, res) => {
    try {
      const likeData = insertLikeSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const like = await storage.createLike(likeData);
      res.status(201).json(like);
    } catch (error) {
      console.error('Create like error:', error);
      res.status(400).json({ message: 'Failed to create like' });
    }
  });

  app.delete('/api/likes', authenticateToken, async (req: any, res) => {
    try {
      const { postId, commentId } = req.body;
      await storage.deleteLike(req.user.id, postId, commentId);
      res.json({ message: 'Like removed' });
    } catch (error) {
      console.error('Delete like error:', error);
      res.status(500).json({ message: 'Failed to delete like' });
    }
  });

  // Analytics routes (staff only)
  app.get('/api/analytics', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user?.isStaff) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const days = parseInt(req.query.days as string) || 30;
      const analytics = await storage.getAnalytics(days);
      res.json(analytics);
    } catch (error) {
      console.error('Get analytics error:', error);
      res.status(500).json({ message: 'Failed to get analytics' });
    }
  });

  app.get('/api/analytics/latest', authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user?.isStaff) {
        return res.status(403).json({ message: 'Access denied' });
      }

      let analytics = await storage.getLatestAnalytics();
      
      // Create sample analytics if none exist
      if (!analytics) {
        analytics = await storage.createAnalytics({
          visitors: 2110,
          earnings: 820000, // $8200 in cents
          orders: 1124,
          revenue: 2504900, // $25049 in cents
        });
      }

      res.json(analytics);
    } catch (error) {
      console.error('Get latest analytics error:', error);
      res.status(500).json({ message: 'Failed to get latest analytics' });
    }
  });

  // Users routes
  app.get('/api/users', authenticateToken, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const users = await storage.getUsers(limit);
      res.json(users.map(user => ({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        profileImage: user.profileImage,
      })));
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  });

  app.get('/api/users/:id', authenticateToken, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        profileImage: user.profileImage,
        isStaff: user.isStaff,
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Failed to get user' });
    }
  });

  // Clean up expired stories periodically
  setInterval(async () => {
    try {
      await storage.deleteExpiredStories();
    } catch (error) {
      console.error('Failed to cleanup expired stories:', error);
    }
  }, 60 * 60 * 1000); // Every hour

  const httpServer = createServer(app);
  return httpServer;
}

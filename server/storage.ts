import { 
  users, 
  posts, 
  stories, 
  friendRequests, 
  friendships, 
  comments, 
  likes, 
  analytics,
  type User, 
  type InsertUser, 
  type Post, 
  type InsertPost, 
  type Story, 
  type InsertStory, 
  type FriendRequest, 
  type InsertFriendRequest, 
  type Comment, 
  type InsertComment, 
  type Like, 
  type InsertLike, 
  type Analytics, 
  type InsertAnalytics 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ne, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  getUsers(limit?: number): Promise<User[]>;
  
  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getPosts(limit?: number, offset?: number): Promise<Post[]>;
  getPostsByUser(userId: number, limit?: number): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<void>;
  
  // Story operations
  createStory(story: InsertStory): Promise<Story>;
  getActiveStories(limit?: number): Promise<Story[]>;
  getStoriesByUser(userId: number): Promise<Story[]>;
  deleteExpiredStories(): Promise<void>;
  
  // Friend request operations
  sendFriendRequest(request: InsertFriendRequest): Promise<FriendRequest>;
  getFriendRequests(userId: number): Promise<FriendRequest[]>;
  getSentFriendRequests(userId: number): Promise<FriendRequest[]>;
  acceptFriendRequest(requestId: number): Promise<void>;
  rejectFriendRequest(requestId: number): Promise<void>;
  
  // Friends operations
  getFriends(userId: number): Promise<User[]>;
  areFriends(user1Id: number, user2Id: number): Promise<boolean>;
  
  // Comment operations
  createComment(comment: InsertComment): Promise<Comment>;
  getCommentsByPost(postId: number): Promise<Comment[]>;
  deleteComment(id: number): Promise<void>;
  
  // Like operations
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(userId: number, postId?: number, commentId?: number): Promise<void>;
  getLikesByPost(postId: number): Promise<Like[]>;
  
  // Analytics operations
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(days?: number): Promise<Analytics[]>;
  getLatestAnalytics(): Promise<Analytics | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUsers(limit = 50): Promise<User[]> {
    return await db.select().from(users).limit(limit);
  }

  // Post operations
  async createPost(postData: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(postData)
      .returning();
    return post;
  }

  async getPosts(limit = 20, offset = 0): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPostsByUser(userId: number, limit = 20): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, userId))
      .orderBy(desc(posts.createdAt))
      .limit(limit);
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async updatePost(id: number, postData: Partial<InsertPost>): Promise<Post> {
    const [post] = await db
      .update(posts)
      .set({ ...postData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post;
  }

  async deletePost(id: number): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Story operations
  async createStory(storyData: InsertStory): Promise<Story> {
    const [story] = await db
      .insert(stories)
      .values(storyData)
      .returning();
    return story;
  }

  async getActiveStories(limit = 10): Promise<Story[]> {
    return await db
      .select()
      .from(stories)
      .where(sql`${stories.expiresAt} > NOW()`)
      .orderBy(desc(stories.createdAt))
      .limit(limit);
  }

  async getStoriesByUser(userId: number): Promise<Story[]> {
    return await db
      .select()
      .from(stories)
      .where(and(
        eq(stories.authorId, userId),
        sql`${stories.expiresAt} > NOW()`
      ))
      .orderBy(desc(stories.createdAt));
  }

  async deleteExpiredStories(): Promise<void> {
    await db.delete(stories).where(sql`${stories.expiresAt} <= NOW()`);
  }

  // Friend request operations
  async sendFriendRequest(requestData: InsertFriendRequest): Promise<FriendRequest> {
    const [request] = await db
      .insert(friendRequests)
      .values(requestData)
      .returning();
    return request;
  }

  async getFriendRequests(userId: number): Promise<FriendRequest[]> {
    return await db
      .select()
      .from(friendRequests)
      .where(and(
        eq(friendRequests.receiverId, userId),
        eq(friendRequests.status, "pending")
      ))
      .orderBy(desc(friendRequests.createdAt));
  }

  async getSentFriendRequests(userId: number): Promise<FriendRequest[]> {
    return await db
      .select()
      .from(friendRequests)
      .where(and(
        eq(friendRequests.senderId, userId),
        eq(friendRequests.status, "pending")
      ))
      .orderBy(desc(friendRequests.createdAt));
  }

  async acceptFriendRequest(requestId: number): Promise<void> {
    const [request] = await db
      .update(friendRequests)
      .set({ status: "accepted", updatedAt: new Date() })
      .where(eq(friendRequests.id, requestId))
      .returning();

    if (request) {
      // Create friendship
      await db.insert(friendships).values({
        user1Id: request.senderId,
        user2Id: request.receiverId,
      });
    }
  }

  async rejectFriendRequest(requestId: number): Promise<void> {
    await db
      .update(friendRequests)
      .set({ status: "rejected", updatedAt: new Date() })
      .where(eq(friendRequests.id, requestId));
  }

  // Friends operations
  async getFriends(userId: number): Promise<User[]> {
    const friendships1 = await db
      .select({ friendId: friendships.user2Id })
      .from(friendships)
      .where(eq(friendships.user1Id, userId));

    const friendships2 = await db
      .select({ friendId: friendships.user1Id })
      .from(friendships)
      .where(eq(friendships.user2Id, userId));

    const friendIds = [
      ...friendships1.map(f => f.friendId),
      ...friendships2.map(f => f.friendId)
    ];

    if (friendIds.length === 0) return [];

    return await db
      .select()
      .from(users)
      .where(sql`${users.id} IN (${friendIds.join(',')})`);
  }

  async areFriends(user1Id: number, user2Id: number): Promise<boolean> {
    const [friendship] = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.user1Id, user1Id), eq(friendships.user2Id, user2Id)),
          and(eq(friendships.user1Id, user2Id), eq(friendships.user2Id, user1Id))
        )
      );
    return !!friendship;
  }

  // Comment operations
  async createComment(commentData: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(commentData)
      .returning();
    return comment;
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  }

  async deleteComment(id: number): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }

  // Like operations
  async createLike(likeData: InsertLike): Promise<Like> {
    const [like] = await db
      .insert(likes)
      .values(likeData)
      .returning();
    return like;
  }

  async deleteLike(userId: number, postId?: number, commentId?: number): Promise<void> {
    const conditions = [eq(likes.userId, userId)];
    
    if (postId) conditions.push(eq(likes.postId, postId));
    if (commentId) conditions.push(eq(likes.commentId, commentId));

    await db.delete(likes).where(and(...conditions));
  }

  async getLikesByPost(postId: number): Promise<Like[]> {
    return await db
      .select()
      .from(likes)
      .where(eq(likes.postId, postId));
  }

  // Analytics operations
  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [analyticsResult] = await db
      .insert(analytics)
      .values(analyticsData)
      .returning();
    return analyticsResult;
  }

  async getAnalytics(days = 30): Promise<Analytics[]> {
    return await db
      .select()
      .from(analytics)
      .where(sql`${analytics.date} >= NOW() - INTERVAL '${days} days'`)
      .orderBy(desc(analytics.date));
  }

  async getLatestAnalytics(): Promise<Analytics | undefined> {
    const [analyticsResult] = await db
      .select()
      .from(analytics)
      .orderBy(desc(analytics.date))
      .limit(1);
    return analyticsResult || undefined;
  }
}

export const storage = new DatabaseStorage();

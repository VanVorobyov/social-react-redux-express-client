export interface User {
  id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  posts: Post[]
  following: Follows[]
  followers: Follows[]
  likes: Like[]
  comments: Comment[]
  isFollowing?: boolean
}

export interface Follows {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}

export interface Post {
  id: string
  content: string
  author: User
  authorId: string
  likes: Like[]
  comments: Comment[]
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Like {
  id: string
  user: User
  userId: string
  post: Post
  postId: string
}

export interface Comment {
  id: string
  content: string
  user: User
  userId: string
  post: Post
  postId: string
}

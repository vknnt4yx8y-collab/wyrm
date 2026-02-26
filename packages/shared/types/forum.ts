export interface ForumCategoryDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  parentId?: string;
  staffOnly: boolean;
  threadCount: number;
  postCount: number;
  lastPost?: {
    threadTitle: string;
    threadId: string;
    authorName: string;
    createdAt: string;
  };
}

export interface ForumThreadDetail {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  authorId: string;
  authorName: string;
  authorRank: string;
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface ForumPostDetail {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorRank: string;
  authorPostCount: number;
  authorJoinedAt: string;
  content: string;
  isFirst: boolean;
  createdAt: string;
  editedAt?: string;
  reactions: Record<string, number>;
  userReaction?: string;
}

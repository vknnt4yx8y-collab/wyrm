export interface NewsArticleDetail {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImg?: string;
  category: NewsCategory;
  author: {
    id: string;
    name: string;
    rank: string;
  };
  publishedAt: string;
  updatedAt: string;
}

export type NewsCategory = "UPDATE" | "CHANGELOG" | "EVENT" | "COMMUNITY" | "ANNOUNCEMENT";

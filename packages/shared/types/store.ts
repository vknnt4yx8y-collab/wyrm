export interface StoreProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: StoreCategory;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
  isActive: boolean;
  sortOrder: number;
}

export type StoreCategory = "RANK" | "CRATE" | "PET" | "BOMB" | "COSMETIC" | "GIFT_CARD";

export interface CartItem {
  product: StoreProductDetail;
  quantity: number;
  recipientName?: string;
  isGift: boolean;
}

export interface CheckoutRequest {
  items: Array<{
    productId: string;
    quantity: number;
    recipientName?: string;
    isGift: boolean;
  }>;
  paymentMethodId: string;
  currency: string;
}

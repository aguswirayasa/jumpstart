import { string } from "zod";

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type Users = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
};
export type Product = {
  id?: string;
  name: string;
  description: string;
  thumbnail: string;
  stock: string;
  price: string;
  categoryId: string;
  specifications: Specification[];
  images: Image[];
  variantOptions: Variant[];
  createdAt?: Date;
};
export type Variant = {
  name: string;

  stock: number;
};
export type Categories = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Specification = {
  name: string;
  value: string;
};
export type Cloudinary = {
  info: any;
  public_id: string;
};
export type Image = {
  url: string;
  id?: string;
};
export type Category = {
  name: string;
  thumbnail: string | "";
  id?: string;
};
export type ProductCardProps = {
  [x: string]: any;
  id: string;
  thumbnail: string | null;
  name: string;
  price: number;
  averageRating: number;
  totalReviews: number;
  createdAt?: Date;
};

export type Profile = {
  avatar?: string;
  firstName: string;
  uid?: string;
  lastName: string;
  birthDay: Date;
  gender: string;
};

export type Address = {
  id?: string;
  street: string;
  state: string;
  city: string;
  country: string;
  postalCode: string;
};
export type wishlistRequest = {
  productId: string;
  userEmail: string;
};

export type ReviewRequest = {
  rating: number;
  comment: string;
  orderItemsId: string;
  productId: string;
  userEmail: string;
  productVariant: string;
};

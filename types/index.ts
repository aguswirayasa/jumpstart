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
  id: string;
  thumbnail: string | null;
  name: string;
  price: number;
};

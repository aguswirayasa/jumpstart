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
  name: string;
  description: string;
  price: string;
  categoryId: string;
  specifications: Specification[];
  images: Image[];
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
};
export type Category = {
  name: string;
};
export type ProductCardProps = {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: string;
};

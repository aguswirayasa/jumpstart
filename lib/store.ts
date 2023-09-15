import { Address, Category } from "@/types";
import { create } from "zustand";

type Wishlist = {
  productId: string;
};

interface CartState {
  address: Address;
  setAddress: (address: Address) => void;
}
interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}
interface WishlistState {
  wishlist: Wishlist[];
  setWishlist: (wishlist: Wishlist[]) => void;
}

export const useCheckoutStore = create<CartState>((set) => ({
  address: {
    street: "",
    state: "",
    city: "",
    country: "",
    postalCode: "",
  },
  setAddress: (address: Address) => set({ address }),
}));

export const useCategoryStore = create<CategoriesState>((set) => ({
  categories: [
    {
      name: "",
      thumbnail: "",
      id: "",
    },
  ],
  setCategories: (categories: Category[]) => set({ categories }),
}));

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  setWishlist: (wishlist) => set((state) => ({ ...state, wishlist })),
}));

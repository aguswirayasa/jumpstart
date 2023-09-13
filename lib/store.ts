import { Address, Category } from "@/types";
import { create } from "zustand";

interface CartState {
  address: Address;
  setAddress: (address: Address) => void;
}
interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
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

import { Address } from "@/types";
import { create } from "zustand";

interface CartState {
  address: Address;
  setAddress: (address: Address) => void;
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

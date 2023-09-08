import React from "react";

import Navbar from "@/components/customer/navigation/navbar";
import CartProviders from "@/providers/CartProvider";
import Footer from "@/components/customer/navigation/footer";
import prismadb from "@/lib/prismadb";
const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  async function getCategories() {
    "use server";
    try {
      const categories = await prismadb.category.findMany({
        take: 10,
        select: {
          name: true,
        },
      });
      return categories;
    } catch (error) {
      console.log(error);
    } finally {
      await prismadb.$disconnect();
    }
  }
  const categories = await getCategories();
  return (
    <CartProviders>
      <div className="h-screen">
        <Navbar categories={categories!} />
        <main className=" w-full">{children}</main>
        <Footer />
      </div>
    </CartProviders>
  );
};

export default CustomerLayout;

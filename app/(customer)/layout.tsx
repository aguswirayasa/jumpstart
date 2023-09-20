import React from "react";
import { getServerSession } from "next-auth";

import Navbar from "@/components/customer/navigation/navbar";
import CartProviders from "@/providers/CartProvider";
import Footer from "@/components/customer/navigation/footer";
import prismadb from "@/lib/prismadb";
import ProgressBarProviders from "@/providers/ProgressBarProvider";
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
  const session = await getServerSession();
  const email = session?.user.email;
  return (
    <CartProviders email={email || "no-login"}>
      <ProgressBarProviders>
        <div className="h-screen">
          <Navbar categories={categories!} />
          <main className=" w-full">{children}</main>
          <Footer />
        </div>
      </ProgressBarProviders>
    </CartProviders>
  );
};

export default CustomerLayout;

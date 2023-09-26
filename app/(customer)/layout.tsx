import React from "react";
import { getServerSession } from "next-auth";

import Navbar from "@/components/customer/navigation/navbar";
import CartProviders from "@/providers/CartProvider";
import Footer from "@/components/customer/navigation/footer";
import prismadb from "@/lib/prismadb";
import ProgressBarProviders from "@/providers/ProgressBarProvider";
import { getSomeCategories } from "@/lib/server-utils";
const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getSomeCategories();
  const session = await getServerSession();
  const email = session?.user.email;
  return (
    <CartProviders email={email || "no-login"}>
      <ProgressBarProviders>
        <div className="h-screen">
          <Navbar categories={categories!} email={session?.user?.email || ""} />
          <main className=" w-full">{children}</main>
          <Footer />
        </div>
      </ProgressBarProviders>
    </CartProviders>
  );
};

export default CustomerLayout;

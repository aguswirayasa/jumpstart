import { Address } from "@/types";
import prismadb from "./prismadb";
import { error } from "console";

export async function decrementStock(
  productId: string,
  variantName: string,
  quantity: number
) {
  try {
    await prismadb.$transaction(async (tx) => {
      // Find the product by name
      const product = await tx.product.findUnique({
        where: { id: productId },
        include: {
          variantOption: true,
        },
      });

      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }

      // Check if the product has variants
      if (product.variantOption.length > 0) {
        // Find the variant option by name and associated with the product
        const variantOption = await tx.variantOption.findFirst({
          where: {
            name: variantName,
            productId: product.id,
          },
        });

        if (!variantOption) {
          throw new Error(`Variant option not found: ${variantName}`);
        }

        // Calculate the new stock for the variant option
        const newVariantStock = variantOption.stock - quantity;

        if (newVariantStock < 0) {
          throw new Error(
            `Insufficient stock for variant option: ${variantName}`
          );
        }

        // Update the variant option's stock
        await tx.variantOption.update({
          where: { id: variantOption.id },
          data: { stock: newVariantStock },
        });
      }

      // Calculate the new stock for the product
      const newProductStock = product.stock - quantity;

      if (newProductStock < 0) {
        throw new Error(`Insufficient stock for product: ${productId}`);
      }
      const updatedSold = product.sold + quantity;
      // Update the product's stock
      await tx.product.update({
        where: { id: product.id },
        data: { stock: newProductStock, sold: updatedSold },
      });
    });

    console.log(`Stocks updated successfully for ${productId}`);
  } catch (error: any) {
    console.error(`Error updating stocks: ${error.message}`);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getCategories() {
  "use server";
  try {
    const categories = await prismadb.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getOrders() {
  try {
    const orders = await prismadb.orders.findMany({
      include: {
        orderItems: {
          include: {
            product: true, // Include the product field within orderItems
          },
        },
        user: true,
      },
    });
    return orders;
  } catch (error) {
    console.error(error);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getCustomer() {
  "use server";
  try {
    const customers = await prismadb.users.findMany();
    return customers;
  } catch (error) {
    console.log(error);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getProfile(email: string) {
  try {
    const profile = await prismadb.users.findUnique({
      where: { email },
      select: {
        avatarUrl: true,
        firstName: true,
        lastName: true,
        gender: true,
        birthday: true,
        email: true,
        id: true,
      },
    });

    return profile; // You might want to return the profile here.
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
  } finally {
    await prismadb.$disconnect();
  }
}
export async function addAddress(address: Address, id: string) {
  try {
    await prismadb.shippingAddress.create({
      data: {
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        street: address.street,
        state: address.state,
        userId: id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prismadb.$disconnect();
  }
}
export async function updateAddress(address: Address, id: string) {
  try {
    await prismadb.shippingAddress.update({
      where: {
        id: id,
      },
      data: {
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        street: address.street,
        state: address.state,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getShippingAddress(uid: string) {
  try {
    const address = await prismadb.shippingAddress.findMany({
      where: {
        userId: uid,
      },
      select: {
        city: true,
        country: true,
        postalCode: true,
        street: true,
        state: true,
        id: true,
      },
    });
    return address;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

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
      console.log("Updated sold for" + product.name + ": " + updatedSold);
      // Update the product's stock
      const datas = await tx.product.update({
        where: { id: product.id },
        data: { stock: newProductStock, sold: product.sold + quantity },
      });
      console.log("data", datas);
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
    return [];
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
      orderBy: {
        createdAt: "desc",
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
    const customers = await prismadb.users.findMany({
      where: {
        role: "CUSTOMER",
      },
    });
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

export async function getUserOrderHistory(email: string) {
  try {
    const orderHistory = await prismadb.orders.findMany({
      where: {
        userEmail: email,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orderHistory;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getSales() {
  try {
    const sales = await prismadb.sale.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return sales;
  } catch (error) {
    console.error(`Error fetching monthly sales: `, error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getBestSellerItem() {
  try {
    const mostOrderedItems: any[] = await prismadb.$queryRaw`
    SELECT 
      O.productId,
      O.productVariant,
      SUM(O.quantity) as totalQuantity,
      P.name
    FROM OrderItem O
    JOIN Product P ON O.productId = P.id
    GROUP BY O.productId, O.productVariant, P.name
    ORDER BY totalQuantity DESC
    LIMIT 3;
  `;
    const formattedItems = mostOrderedItems.map((item) => ({
      ...item,
      totalQuantity: Number(item.totalQuantity),
    }));

    return formattedItems;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getStatistics() {
  try {
    // Fetch total sales
    const totalSales = await prismadb.sale.aggregate({
      _sum: {
        amount: true,
      },
    });

    // Fetch total number of orders
    const totalOrders = await prismadb.orders.count();

    // Fetch total number of products
    const totalProducts = await prismadb.product.count();

    return {
      totalSales: totalSales._sum.amount || 0,
      totalOrders,
      totalProducts,
    };
  } catch (error) {
    throw error;
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getRecentOrders() {
  try {
    const recentOrders = await prismadb.orders.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return recentOrders;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function incrementSaleAmount(totalPrice: number) {
  try {
    // Find the current sale record
    const currentSale = await prismadb.sale.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Increment the amount field by totalPrice
    await prismadb.sale.update({
      where: {
        id: currentSale?.id,
      },
      data: {
        amount: {
          increment: totalPrice,
        },
      },
    });

    console.log("Sale amount updated successfully.");
  } catch (error) {
    console.error("Error updating sale amount:", error);
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getProductByCategory(categoryName: string) {
  try {
    const products = await prismadb.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
      },
      select: {
        name: true,
        id: true,
        price: true,
        thumbnail: true,
        createdAt: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });
    const productstWithConvertedRatings = products.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new object without the 'reviews' property
      const productWithoutReviews = {
        ...item,
        reviews: undefined,
      };

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...productWithoutReviews,
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        product: productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return productstWithConvertedRatings;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function searchProduct(keyword: string) {
  console.log(keyword);
  try {
    const products = await prismadb.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
            },
          },
          {
            category: {
              name: {
                contains: keyword,
              },
            },
          },
        ],
      },
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const productstWithConvertedRatings = products.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new object without the 'reviews' property
      const productWithoutReviews = {
        ...item,
        reviews: undefined,
      };

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...productWithoutReviews,
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        ...item,
        product: productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return productstWithConvertedRatings;
  } catch (error) {
    console.error("Error searching for products:", error);
    throw error;
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getWishlist(email: string) {
  try {
    const wishlist = await prismadb.wishlist.findMany({
      where: {
        userEmail: email,
      },
      include: {
        product: {
          include: {
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });
    const wishlistWithConvertedRatings = wishlist.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.product.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...item.product,
        reviews: item.product.reviews, // Keep the original reviews
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        ...item,
        product: productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return wishlistWithConvertedRatings;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prismadb.$disconnect();
  }
}

export async function isInWishlist(productId: string, email: string) {
  try {
    const wishlist = await prismadb.wishlist.findFirst({
      where: {
        userEmail: email,
        productId: productId,
      },
    });
    return !!wishlist;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await prismadb.$disconnect();
  }
}

export async function getAllProducts() {
  "use server";
  try {
    const products = await prismadb.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        thumbnail: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });
    const productstWithConvertedRatings = products.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new object without the 'reviews' property
      const productWithoutReviews = {
        ...item,
        reviews: undefined,
      };

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...productWithoutReviews,
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        ...item,
        product: productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return productstWithConvertedRatings;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  } finally {
    prismadb.$disconnect;
  }
}

export async function getAllBanners() {
  try {
    const result = await prismadb.banner.findMany();
    return result;
  } catch (error) {
    console.log(error);
    return []; //
  } finally {
    await prismadb.$disconnect();
  }
}
export async function getAllActiveBanners() {
  try {
    const result = await prismadb.banner.findMany({
      where: {
        active: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return []; //
  } finally {
    await prismadb.$disconnect();
  }
}
export async function getCategoryById(id: string) {
  try {
    const result = await prismadb.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        thumbnail: true,
      },
    });
    return result;
  } catch (error) {
    return null;
  } finally {
    prismadb.$disconnect();
  }
}
export async function getProductById(id: string) {
  try {
    const result = await prismadb.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        category: true,
        categoryId: true,
        price: true,
        stock: true,
        productImages: true,
        specifications: true,
        variantOption: true,
        createdAt: true,
      },
    });

    if (!result) {
      return null; // Return null if the product doesn't exist
    }

    // Create a formatted product object
    const formattedProduct = {
      id: id,
      name: result.name || "",
      description: result.description || "",
      price: result.price || 0,
      thumbnail: result.thumbnail || "",
      stock: result.stock + "" || "0",
      categoryId: result.categoryId || "",
      specifications: result.specifications || [],
      images: result.productImages || [],
      variantOptions: result.variantOption || [],
    };

    return formattedProduct;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null if an error occurs
  } finally {
    await prismadb.$disconnect();
  }
}
export async function getListOfBestSelling() {
  try {
    const products = await prismadb.product.findMany({
      orderBy: {
        sold: "desc",
      },
      select: {
        id: true,
        thumbnail: true,
        name: true,
        sold: true,
        price: true,
        reviews: true,
      },
    });
    const productstWithConvertedRatings = products.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new object without the 'reviews' property
      const { reviews, ...productWithoutReviews } = item; // Remove the reviews property

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...productWithoutReviews,
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        ...productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return productstWithConvertedRatings;
  } catch (error) {
    return [];
  } finally {
    prismadb.$disconnect();
  }
}
export async function getNewProducts() {
  try {
    const products = await prismadb.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        thumbnail: true,
        name: true,
        price: true,
        reviews: true,
        sold: true,
      },
    });
    const productstWithConvertedRatings = products.map((item) => {
      let totalRating = 0;
      let totalReviews = 0;

      // Calculate totalRating and totalReviews for this product
      item.reviews.forEach((review) => {
        totalRating += review.rating.toNumber(); // Assuming toNumber() converts it to a number
        totalReviews++;
      });

      // Calculate the average rating for this product
      const averageRating =
        totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";

      // Create a new object without the 'reviews' property
      const { reviews, ...productWithoutReviews } = item; // Remove the reviews property

      // Create a new product object with the calculated averageRating
      const productWithConvertedRatings = {
        ...productWithoutReviews,
        averageRating: averageRating, // Add the averageRating property
        totalReviews: totalReviews, // Add the totalReviews property
      };

      return {
        ...productWithConvertedRatings, // Replace the product with the one containing averageRating
      };
    });

    return productstWithConvertedRatings;
  } catch (error) {
    return [];
  } finally {
    prismadb.$disconnect();
  }
}

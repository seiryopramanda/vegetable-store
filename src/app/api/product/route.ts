import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const take = 9;
    const query = req.nextUrl.searchParams;
    const page = query.get("page")
      ? parseInt(query.get("page") as string) - 1
      : 0;
    const categories = query.get("category")?.split(",") || undefined;

    const minPrice = query.get("minPrice")
      ? parseInt(query.get("minPrice") as string)
      : undefined;
    const maxPrice = query.get("maxPrice")
      ? parseInt(query.get("maxPrice") as string)
      : undefined;

    const skip = take * page;

    const queryCondition = {
      AND: [
        {
          category: {
            in: categories as ProductCategory[],
          },
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      ],
    };

    const totalProducts = await prisma.product.count({});
    const products = await prisma.product.findMany({
      take,
      skip,
      where: queryCondition,
    });

    return Response({
      message: "Get All Products",
      data: {
        total: totalProducts,
        data: products,
      },
    });
  } catch (error: any) {
    return Response({
      message: "Failed to get products",
      data: error,
      status: 500,
    });
  }
}

import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const payload = await req.json();

    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: session?.user?.id,
        transactionId: {
          equals: null,
        },
      },
    });

    const totalPrice = checkouts.reduce(
      (total, checkout) => total + checkout.pricePerItem * checkout.qty,
      0
    );

    const grandTotalPrice =
      totalPrice +
      payload.applicationFee +
      payload.asuranceFee +
      payload.deliveryFee;

    const transaction = await prisma.transaction.create({
      data: {
        userId: session?.user?.id,
        applicationFee: payload.applicationFee,
        asuranceFee: payload.asuranceFee,
        deliveryFee: payload.deliveryFee,
        deliveryType: payload.deliveryType,
        grandTotalPrice: grandTotalPrice,
        totalPrice: totalPrice,
      },
    });

    await prisma.checkout.updateMany({
      where: {
        userId: session?.user?.id,
        transactionId: {
          equals: null,
        },
      },
      data: {
        transactionId: transaction.id,
      },
    });

    await prisma.product.updateMany({
      where: {
        id: {
          in: checkouts.map((checkout) => checkout.productId),
        },
      },
      data: {
        itemSold: {
          increment: 1,
        },
      },
    });

    return Response({
      message: "Payment Success",
      data: transaction,
    });
  } catch (error) {
    return Response({
      message: "Payment Failed",
      data: error,
      status: 500,
    });
  }
}

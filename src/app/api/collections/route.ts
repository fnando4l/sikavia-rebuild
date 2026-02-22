import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const collections = await prisma.collection.findMany({
      where: featured === "true" ? { featured: true } : undefined,
      include: {
        products: {
          include: {
            product: {
              include: { variants: { orderBy: { price: "asc" }, take: 1 } },
            },
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(collections);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

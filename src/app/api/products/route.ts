import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug       = searchParams.get("slug");
    const collection = searchParams.get("collection");
    const featured   = searchParams.get("featured");
    const status     = searchParams.get("status") ?? "ACTIVE";
    const limit      = Number(searchParams.get("limit")) || 50;

    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          variants: { orderBy: { price: "asc" } },
          collections: { include: { collection: { select: { id: true, name: true, slug: true } } } },
          reviews: {
            where: { approved: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(product);
    }

    const products = await prisma.product.findMany({
      where: {
        status: status as "ACTIVE" | "DRAFT" | "ARCHIVED",
        ...(featured === "true" && { featured: true }),
        ...(collection && {
          collections: { some: { collection: { slug: collection } } },
        }),
      },
      include: {
        variants: { orderBy: { price: "asc" }, take: 1 },
        collections: { include: { collection: { select: { name: true, slug: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name:        body.name,
        slug:        body.slug,
        description: body.description,
        features:    body.features ?? [],
        images:      body.images   ?? [],
        basePrice:   body.basePrice,
        featured:    body.featured  ?? false,
        status:      body.status    ?? "DRAFT",
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

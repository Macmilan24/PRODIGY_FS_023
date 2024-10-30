import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);

    console.log(product);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        { status: 404 }
      );
    }

    const relatedProduct = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } },
      ],
      _id: { $ne: product._id },
    });

    if (!relatedProduct) {
      return new NextResponse(JSON.stringify({ message: "No related found" }), {
        status: 404,
      });
    }

    return NextResponse.json(relatedProduct, { status: 200 });
  } catch (err) {
    console.log("[related_GET]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const userId = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    console.log({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const newProduct = new Product({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionid of collections) {
        const collection = await Collection.findById(collectionid);

        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return new NextResponse(newProduct, { status: 201 });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 201 });
  } catch (err) {
    console.log("[product_GET", err);
    return new NextResponse("Error getting products", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

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
      catagory,
      collectons,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !catagory || !price || !expense) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const newProduct = new Product({
      title,
      description,
      media,
      catagory,
      collectons,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    return new NextResponse(newProduct, { status: 201 });
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

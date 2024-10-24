import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionid: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionid);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("collectionDetails_GET:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionid: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let collection = await Collection.findById(params.collectionid);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionid,
      { title, description, image },
      { new: true }
    );

    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.error("collection_POST:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionid: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionid);

    return new NextResponse("Collection deleted", { status: 200 });
  } catch (err) {
    console.log("collection_DELETE:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

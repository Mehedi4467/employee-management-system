import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId

interface UpdateTransactionData {
  _id: string;
}

export async function POST(req: NextRequest) {
  try {
    const newValue: UpdateTransactionData = await req.json();

    if (!newValue?._id || newValue === undefined) {
      return NextResponse.json({
        status: false,
        message: "Missing _id or newValue in the request",
      });
    }

    const { _id, ...updateData } = newValue;

    const objectId = new ObjectId(_id);
    const { db } = await connectToDatabase();
    const updateResult = await db
      .collection("tayyar-acounts")
      .updateOne({ _id: objectId }, { $set: updateData });
    return NextResponse.json({
      status: updateResult.modifiedCount > 0,
      message:
        updateResult.modifiedCount > 0
          ? "Transaction value updated successfully"
          : "No changes made to the transaction",
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

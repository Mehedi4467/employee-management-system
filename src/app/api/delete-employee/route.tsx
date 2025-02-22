import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        status: false,
        message: 'Employee ID is required',
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('ems-data');

    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        status: false,
        message: 'Employee not found or already deleted',
      });
    }

    return NextResponse.json({
      status: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    return NextResponse.json({
      status: false,
      message: 'Internal Server Error',
    });
  }
}

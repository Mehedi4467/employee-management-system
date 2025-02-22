/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface EmployeeData {
  _id?: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  profilePicture?: string;
  joiningDate: number;
}

export async function PATCH(req: NextRequest) {
  try {
    const newValue: EmployeeData = await req.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('ems-data');

    const filter = newValue._id ? { _id: new ObjectId(newValue._id) } : {};
    const { _id, ...updateData } = newValue;
    const updateResult = await collection.updateOne(
      filter,
      { $set: updateData },
      { upsert: true },
    );

    return NextResponse.json({
      status: true,
      message:
        updateResult.upsertedCount > 0
          ? 'New employee inserted successfully'
          : 'Employee data updated successfully',
      data: updateResult,
    });
  } catch (error) {
    console.error('Error handling PATCH request:', error);
    return NextResponse.json({
      status: false,
      message: 'Internal Server Error',
    });
  }
}

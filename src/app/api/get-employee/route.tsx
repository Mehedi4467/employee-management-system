import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit: number = 10;
    const search: string = searchParams.get('search') || '';
    const joiningDate: string | null = searchParams.get('joiningDate');
    const { db } = await connectToDatabase();
    const collection = db.collection('ems-data');

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    let dateFilter = {};
    if (joiningDate) {
      const startOfDay = new Date(joiningDate).setHours(0, 0, 0, 0);
      const endOfDay = new Date(joiningDate).setHours(23, 59, 59, 999);

      dateFilter = {
        joiningDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      };
    }

    const query = { ...searchQuery, ...dateFilter };
    const totalRecords = await collection.countDocuments(query);

    const employees = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ joiningDate: -1 })
      .toArray();

    return NextResponse.json({
      status: true,
      message: 'Employees fetched successfully',
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit,
      data: employees,
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({
      status: false,
      message: 'Internal Server Error',
    });
  }
}

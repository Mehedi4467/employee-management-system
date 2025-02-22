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

    // Search Query (By Name, Phone, or Email)
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Filter by Joining Date (if provided)
    const dateFilter = joiningDate
      ? { joiningDate: { $gte: new Date(joiningDate) } }
      : {};

    // Final Query
    const query = { ...searchQuery, ...dateFilter };

    // Get Total Count
    const totalRecords = await collection.countDocuments(query);

    // Fetch Data with Pagination
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

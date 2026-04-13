import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const places = await db.place.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: places });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const place = await db.place.create({ data });
    return NextResponse.json({ success: true, data: place }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create place' },
      { status: 500 }
    );
  }
}

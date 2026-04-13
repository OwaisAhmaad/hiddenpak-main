import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const image = await db.galleryImage.create({ data });
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}

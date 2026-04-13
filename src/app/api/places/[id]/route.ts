import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const place = await db.place.findUnique({ where: { id } });
    if (!place) {
      return NextResponse.json(
        { success: false, message: 'Place not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: place });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch place' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const place = await db.place.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: place });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update place' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.place.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete place' },
      { status: 500 }
    );
  }
}

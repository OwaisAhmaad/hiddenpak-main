import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead: body.isRead ?? true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

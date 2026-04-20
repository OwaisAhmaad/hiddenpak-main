import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await api.delete(`/gallery/${id}`);
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}

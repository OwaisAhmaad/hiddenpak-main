import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authHeader = req.headers.get('Authorization');
  const headers = authHeader ? { Authorization: authHeader } : undefined;
  const result = await api.delete(`/gallery/${id}`, headers);
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}

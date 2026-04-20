import { NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/analytics');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}

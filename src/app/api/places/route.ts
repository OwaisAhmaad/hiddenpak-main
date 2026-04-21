import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/places');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await api.post('/places', data);
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating place:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create place' },
      { status: 500 }
    );
  }
}

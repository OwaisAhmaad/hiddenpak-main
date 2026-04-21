import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/settings');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await api.put('/settings', data);
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
=======
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/blogs');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
>>>>>>> 14ab91e3e67c07d8f83835d1b9147c0438419707
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
    const body = await req.json();
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
=======
    const data = await req.json();
    const result = await api.post('/blogs', data);
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result, { status: 201 });
>>>>>>> 14ab91e3e67c07d8f83835d1b9147c0438419707
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

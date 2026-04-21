import { NextResponse } from 'next/server';
<<<<<<< HEAD

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/testimonials`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
=======
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/testimonials');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
>>>>>>> 14ab91e3e67c07d8f83835d1b9147c0438419707
  }
  return NextResponse.json(result);
}

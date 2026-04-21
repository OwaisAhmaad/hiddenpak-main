import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact messages' },
      { status: 500 }
    );
=======
import { api } from '@/lib/api';

export async function GET() {
  const result = await api.get('/contact');
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
>>>>>>> 14ab91e3e67c07d8f83835d1b9147c0438419707
  }
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
<<<<<<< HEAD
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
=======
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Name length validation
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Subject length validation
    if (subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: 'Subject must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Forward to backend API
    const result = await api.post('/contact', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 201 });
>>>>>>> 14ab91e3e67c07d8f83835d1b9147c0438419707
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

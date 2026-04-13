import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    let settings = await db.siteSetting.findFirst();
    if (!settings) {
      settings = await db.siteSetting.create({ data: {} });
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    let settings = await db.siteSetting.findFirst();
    if (!settings) {
      settings = await db.siteSetting.create({ data });
    } else {
      settings = await db.siteSetting.update({
        where: { id: settings.id },
        data,
      });
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

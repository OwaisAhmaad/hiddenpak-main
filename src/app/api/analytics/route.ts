import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [totalBlogs, totalPlaces, totalGallery, totalTestimonials] =
      await Promise.all([
        db.blog.count(),
        db.place.count(),
        db.galleryImage.count(),
        db.testimonial.count(),
      ]);

    const featuredPlaces = await db.place.findMany({
      where: { featured: true },
      take: 5,
    });

    const recentBlogs = await db.blog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalBlogs,
        totalPlaces,
        totalGallery,
        totalTestimonials,
        featuredPlaces,
        recentBlogs,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

import Hero from "@/components/home/Hero";
import FeaturedPlaces from "@/components/home/FeaturedPlaces";
import LatestBlogs from "@/components/home/LatestBlogs";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPlaces />
      <LatestBlogs />
      <GalleryPreview />
      <Testimonials />
    </>
  );
}

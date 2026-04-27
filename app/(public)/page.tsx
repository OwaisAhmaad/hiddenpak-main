import Hero from "@/components/home/Hero";
import FeaturedPlaces from "@/components/home/FeaturedPlaces";
import Categories from "@/components/home/Categories";
import LatestBlogs from "@/components/home/LatestBlogs";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import HeroCTA from "@/components/home/HeroCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedPlaces />
      <Categories />
      <LatestBlogs />
      <GalleryPreview />
      <Testimonials />
      <HeroCTA />
    </main>
  );
}

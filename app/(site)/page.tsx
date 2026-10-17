import { HeroSection } from "@/components/sections/HeroSection";
import { Playing11Section } from "@/components/sections/Playing11Section";
import { FixturesSection } from "@/components/sections/FixturesSection";
import { PointsTableSection } from "@/components/sections/PointsTableSection";
import { Footer } from "@/components/reusable/Footer";
import { NewsSection } from "@/components/sections/NewsSection";
import { MilestoneSection } from "@/components/sections/MilestoneSection";
import { SpotlightSection } from "@/components/sections/SpotlightSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* Section 1: Sunrisers Leeds Hero Section with GSAP scroll scale & fade */}
      <HeroSection />

      {/* Section 2: Playing 11 (Cadillac F1 card stacking GSAP scroll animation) */}
      <Playing11Section />

      {/* Section 3: Fixtures Carousel Section (SunRisers Hyderabad design & animations with 3s auto-scroll) */}
      <FixturesSection />

      {/* Section 4: Milestones */}
      <MilestoneSection />

      {/* Section 5: News & Articles */}
      <NewsSection />

      {/* Section 6: Points Table Section (White bg, orange gradient skewed table, SunRisers highlighted) */}
      <PointsTableSection />

      {/* Section 7: Spotlight */}
      <SpotlightSection />

      {/* Section 8: Sponsors (3D Red Season Ball & Sponsors Grid with 200vh pinned scroll) */}
      <SponsorsSection />

      {/* Section 9: Gallery (GSAP 3-Card expanding to 100vw x 100vh full-screen carousel) */}
      <GallerySection />

      {/* Section 10: Contact (White bg, full-height fading orange gradient CONTACT text & semi-transparent orange form) */}
      <ContactSection />

      {/* Sunrisers Leeds Footer */}
      <Footer />
    </main>
  );
}

import { HeroSection } from "@/components/home/HeroSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturesShowcase } from "@/components/home/FeaturesShowcase";
import { ClassShowcase } from "@/components/home/ClassShowcase";
import { NewsPreview } from "@/components/home/NewsPreview";
import { PressQuotes } from "@/components/home/PressQuotes";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="bg-bg-primary">
      <HeroSection />
      <StatsCounter />
      <FeaturesShowcase />
      <ClassShowcase />
      <NewsPreview />
      <PressQuotes />
      <CTASection />
    </div>
  );
}

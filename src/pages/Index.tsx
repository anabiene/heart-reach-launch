import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EventsCalendar from "@/components/EventsCalendar";
import ImageCarousel from "@/components/ImageCarousel";
import ImpactStats from "@/components/ImpactStats";
import FundingTransparency from "@/components/FundingTransparency";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <EventsCalendar />
      <ImageCarousel />
      <ImpactStats />
      <FundingTransparency />
      <Footer />
    </div>
  );
};

export default Index;

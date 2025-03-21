import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import GraduatesSection from "@/components/GraduatesSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import DirectionsSection from "@/components/DirectionsSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="font-['Open_Sans'] bg-[#F5F5F5] text-[#333333]">
      <Header />
      <HeroSection />
      <JourneySection />
      <GraduatesSection />
      <GallerySection />
      <RSVPSection />
      <DirectionsSection />
      <Footer />
    </div>
  );
};

export default Home;

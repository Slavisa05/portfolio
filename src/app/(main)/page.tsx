import HeroSection from "@/components/homeSections/HeroSection";
import AboutSection from "@/components/homeSections/AboutSection";
import StackSection from "@/components/homeSections/StackSection";
import ProjectSection from "@/components/homeSections/ProjectSection";
import ProcesRadaSection from "@/components/homeSections/ProcesRadaSection";
import TestimonialSection from "@/components/homeSections/TestimonialSection";
import ContactSection from "@/components/homeSections/ContactSection";

export default function Home() {
  return (
    <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectSection />
        <ProcesRadaSection />
        {/* <TestimonialSection /> */}
        <ContactSection />
    </main>
  );
}

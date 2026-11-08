import type { Metadata } from "next";
import HeroSection from "@/components/homeSections/HeroSection";
import ProjectSection from "@/components/homeSections/ProjectSection";
import ServicesSection from "@/components/homeSections/ServicesSection";
import ProcesRadaSection from "@/components/homeSections/ProcesRadaSection";
import AboutSection from "@/components/homeSections/AboutSection";
import FaqSection, { faqs } from "@/components/homeSections/FaqSection";
import ContactSection from "@/components/homeSections/ContactSection";
// import TestimonialSection from "@/components/homeSections/TestimonialSection"; // vratiti kad stignu pravi utisci
import { contact, socials } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://slavisadev.com/#business",
    name: "slavisadev — izrada sajtova",
    url: "https://slavisadev.com",
    image: "https://slavisadev.com/slavisadev.png",
    description:
      "Izrada sajtova i online prodavnica za male biznise u Srbiji: dizajn po meri, izrada, hosting i održavanje.",
    email: contact.email,
    telephone: contact.phoneHref.replace("tel:", ""),
    priceRange: "od 250 €",
    address: { "@type": "PostalAddress", addressLocality: "Ub", addressCountry: "RS" },
    areaServed: [
      { "@type": "City", name: "Ub" },
      { "@type": "City", name: "Beograd" },
      { "@type": "Country", name: "Srbija" },
    ],
    founder: {
      "@type": "Person",
      name: "Slaviša Arsenijević",
      jobTitle: "Web developer",
      image: "https://slavisadev.com/slavisa.jpeg",
      sameAs: socials.map(s => s.url),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paketi",
      itemListElement: [
        { name: "Start — landing stranica", price: "250" },
        { name: "Biznis — prezentacioni sajt", price: "500" },
        { name: "Pro — online prodavnica ili aplikacija", price: "800" },
      ].map(o => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name },
        priceSpecification: { "@type": "PriceSpecification", minPrice: o.price, priceCurrency: "EUR" },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function Home() {
  return (
    <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
        />
        <HeroSection />
        <ProjectSection />
        <ServicesSection />
        <ProcesRadaSection />
        <AboutSection />
        {/* <TestimonialSection /> */}
        <FaqSection />
        <ContactSection />
    </main>
  );
}

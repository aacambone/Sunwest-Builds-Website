import React from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Experience from "@/components/site/Experience";
import Founder from "@/components/site/Founder";
import Services from "@/components/site/Services";
import ProjectStudy from "@/components/site/ProjectStudy";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Testimonials from "@/components/site/Testimonials";

export default function Home() {
  return (
    <main data-testid="home-page" className="bg-white text-brand-ink">
      <Navbar />
      <Hero />
      <Experience />
      <Founder />
      <Services />
      <ProjectStudy />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import StickyCTA from "@/components/layout/StickyCTA";
import SmoothScroll from "@/components/providers/SmoothScroll";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <SmoothScroll>
      <Background />
      <Navbar />
      <StickyCTA />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

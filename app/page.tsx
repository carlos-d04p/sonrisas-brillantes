import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Servicios from "@/components/Servicios";
import Equipo from "@/components/Equipo";
import Faq from "@/components/Faq";
import Ubicacion from "@/components/Ubicacion";
import AgendarCita from "@/components/AgendarCita";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <Equipo />
        <Faq />
        <Ubicacion />
        <AgendarCita />
      </main>
      <Footer />
    </>
  );
}

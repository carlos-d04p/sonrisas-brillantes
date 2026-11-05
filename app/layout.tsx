import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { clinica } from "@/data/clinica";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${clinica.nombre} | Clínica Dental`,
  description: `${clinica.nombre}, clínica dental en Chiclayo. Limpieza, ortodoncia, implantes y más. Agenda tu cita en minutos.`,
};

export const viewport: Viewport = {
  themeColor: "#1f5f4a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}

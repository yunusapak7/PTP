import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangSetter } from "./lang-setter";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ptp.technology"),
  title: { default: "PTP — Plastic-to-Paper Technology Platform", template: "%s | PTP" },
  description: "An international platform connecting material science, paper engineering, industrial coating, validation and global commercialisation.",
  alternates: { canonical: "/en", languages: { "en-GB": "/en", "tr-TR": "/tr", "x-default": "/en" } },
  openGraph: { type: "website", siteName: "PTP", title: "From Plastic Dependence to Scalable Paper Technologies", description: "Chemistry, paper engineering, coating, validation and global collaboration in one industrial technology platform.", images:[{url:"/og-home-v2.png",width:1536,height:1024,alt:"PTP visual showing a transition from transparent polymer film through chemistry and coating to fibre paper production"}] },
  twitter: { card: "summary_large_image", title: "PTP — From Plastic Dependence to Scalable Paper Technologies", description: "Chemistry, paper engineering, coating, validation and global collaboration in one industrial technology platform.", images:["/og-home-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}><LangSetter/>{children}</body></html> }

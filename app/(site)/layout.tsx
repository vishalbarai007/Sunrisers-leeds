import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/data/siteConfig";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import "../globals.css";

const vtfRedzone = localFont({
  src: "../../public/fonts/VTFRedzone_Classic.ttf",
  variable: "--font-redzone",
  display: "swap",
});

const formaDjr = localFont({
  src: [
    {
      path: "../../public/fonts/FormaDJRMicro_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FormaDJRMicro_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-forma",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${vtfRedzone.variable} ${formaDjr.variable}`}>
      <body className="bg-[#070A12] text-slate-100 min-h-screen flex flex-col selection:bg-[#FF6B00] selection:text-white font-sans antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

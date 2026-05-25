import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components/site";
import { getCurrentProfile } from "@/lib/auth";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { profile } = await getCurrentProfile();

  return (
    <html lang="he" dir="rtl">
      <body>
        <Navbar profile={profile} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

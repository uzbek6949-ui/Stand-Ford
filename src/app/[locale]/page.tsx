import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Marquee } from "@/components/sections/marquee";
import { Hook } from "@/components/sections/hook";
import { About } from "@/components/sections/about";
import { Courses } from "@/components/sections/courses";
import { Why } from "@/components/sections/why";
import { Steps } from "@/components/sections/steps";
import { Results } from "@/components/sections/results";
import { Teachers } from "@/components/sections/teachers";
import { Enroll } from "@/components/sections/enroll";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this page into static rendering with the correct locale.
  setRequestLocale(locale);

  // The whole page sits on the brand-red body background; only the framed
  // cards inside the sections keep their own light surfaces.
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Marquee />
        <Hook />
        <About />
        <Courses />
        <Why />
        <Steps />
        <Results />
        <Teachers />
        <Enroll />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

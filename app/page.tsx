import { HeroSection, SectionHeader, ServiceCard, ProfileCard, ButtonLink } from "@/components/site";
import { HomeImageRotator } from "@/components/home-image-rotator";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { TextBlock } from "@/components/text-block";
import { faqItems, homepageSections, providers, services } from "@/lib/content";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const params = await searchParams;

  return (
    <>
      <HeroSection />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="הצוות" title="מי אנחנו ?">
            אנחנו משלבות מבנה מקצועי עם גישה חמה ומעשית שמכבדת את הפרטיות והקצב של כל משפחה.
          </SectionHeader>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {providers.map((provider) => (
              <ProfileCard key={provider.name} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <TextBlock title={homepageSections.block1.title} text={homepageSections.block1.text} />
      <TextBlock title={homepageSections.block2.title} text={homepageSections.block2.text} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <SectionHeader eyebrow="הטיפוחייה שלנו" title="דוגמאות מהיום יום">
            קירבה. מגע. נקניקייה.
          </SectionHeader>
        </div>
        <HomeImageRotator />
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={homepageSections.contact.eyebrow}
          title={
            <>
              {homepageSections.contact.titleLine1}
              <br />
              {homepageSections.contact.titleLine2}
            </>
          }
        >
          {homepageSections.contact.description}
        </SectionHeader>
        <div className="mt-10">
          <ContactForm returnTo="/" sent={Boolean(params.sent)} error={Boolean(params.error)} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={homepageSections.faq.eyebrow} title={homepageSections.faq.title} />
        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <TextBlock title={homepageSections.block3.title} text={homepageSections.block3.text} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="שירותים" title="שבילים שונים לליווי והעמקה" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="paper-panel rounded-[3rem] p-8 sm:p-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-leaf">המלצות</p>
          <p className="mt-5 font-display text-3xl font-semibold leading-tight text-brand sm:text-4xl">
            כאן ניתן להוסיף סיפורי הורים ותוצאות לפרסום.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">דברו איתנו</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              צפייה בשירותים
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

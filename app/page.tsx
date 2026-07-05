import { HeroSection } from "@/components/hero-section";
import { SectionHeader, ServiceCard, ProfileCard, ButtonLink } from "@/components/site";
import { HomeImageRotator } from "@/components/home-image-rotator";
import { HomeVideoEmbed } from "@/components/home-video-embed";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { TextBlock } from "@/components/text-block";
import diagramImage from "@/assets/diagram.png";
import { faqItems, homepageSections, homepageVisibility, services, siteConfig, teamSection, whatIsTipuchiyaSection } from "@/lib/content";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const params = await searchParams;

  return (
    <>
      <HeroSection />

      <TextBlock title={whatIsTipuchiyaSection.title} text={whatIsTipuchiyaSection.text} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={teamSection.title}>
            {teamSection.intro}
          </SectionHeader>
          <p className="mx-auto mt-6 max-w-3xl text-center font-display text-2xl leading-10 text-brand-darker sm:text-3xl">
            {teamSection.highlight}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {teamSection.members.map((member) => (
              <ProfileCard key={member.name} provider={member} />
            ))}
          </div>
        </div>
      </section>

      <TextBlock
        title={homepageSections.block1.title}
        text={homepageSections.block1.text}
        aboutLinks={homepageSections.block1.aboutLinks}
      />
      <TextBlock title={homepageSections.block2.title} text={homepageSections.block2.text} align="start" />

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <SectionHeader
              align="start"
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
            <div className="mt-8 space-y-2 text-right leading-8 text-ink">
              <p className="font-medium text-ink">{homepageSections.contact.emailIntro}</p>
              <p>
                <a href={`mailto:${siteConfig.email1}`} className="font-semibold text-brand-darker hover:text-brand">
                  {siteConfig.email1}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email2}`} className="font-semibold text-brand-darker hover:text-brand">
                  {siteConfig.email2}
                </a>
              </p>
            </div>
          </div>
          <ContactForm returnTo="/" sent={Boolean(params.sent)} error={Boolean(params.error)} compact />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={homepageSections.faq.eyebrow} title={homepageSections.faq.title} />
        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {homepageVisibility.gallery ? (
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <SectionHeader align="start" eyebrow="הטיפוחייה שלנו" title="דוגמאות מהיום יום">
              קירבה. מגע. נקניקייה.
            </SectionHeader>
          </div>
          <HomeImageRotator />
        </section>
      ) : null}

      <TextBlock
        title={homepageSections.block3.title}
        image={diagramImage}
        imageAlt={homepageSections.block3.imageAlt}
      />

      {homepageVisibility.video ? (
        <HomeVideoEmbed embedUrl={homepageSections.video.embedUrl} title={homepageSections.video.title} />
      ) : null}

      {homepageVisibility.services ? (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="שירותים" title="שבילים שונים לליווי והעמקה" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>
      ) : null}

      {homepageVisibility.testimonials ? (
        <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="paper-panel rounded-[3rem] p-8 sm:p-12">
            <p className="text-sm font-bold tracking-[0.2em] text-leaf-dark">המלצות</p>
            <p className="mt-5 font-display text-3xl font-semibold leading-tight text-brand-darker sm:text-4xl">
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
      ) : null}
    </>
  );
}

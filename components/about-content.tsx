import { RichParagraph } from "@/components/rich-text";
import { SectionHeader } from "@/components/site";
import type { RichParagraph as RichParagraphType } from "@/lib/content";
import { aboutPage } from "@/lib/content";

function AboutParagraph({ paragraph }: { paragraph: RichParagraphType }) {
  return (
    <p className="text-justify text-lg leading-9 text-ink">
      <RichParagraph paragraph={paragraph} />
    </p>
  );
}

function AboutListItem({ item }: { item: RichParagraphType }) {
  return (
    <li className="pe-2">
      <RichParagraph paragraph={item} />
    </li>
  );
}

function AboutSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-28 paper-panel rounded-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-brand-darker">{title}</h2>
      <div className="mt-4 space-y-5">{children}</div>
    </article>
  );
}

export function AboutContent() {
  const { philosophy, goals, method, technical } = aboutPage;

  return (
    <div className="space-y-8">
      <AboutSection id={philosophy.id} title={philosophy.title}>
        {philosophy.paragraphs.map((paragraph, index) => (
          <AboutParagraph key={index} paragraph={paragraph} />
        ))}
      </AboutSection>

      <AboutSection id={goals.id} title={goals.title}>
        <ol className="list-decimal space-y-4 ps-6 text-justify text-lg leading-9 text-ink marker:font-semibold marker:text-brand">
          {goals.items.map((item, index) => (
            <AboutListItem key={index} item={item} />
          ))}
        </ol>
      </AboutSection>

      <AboutSection id={method.id} title={method.title}>
        {method.intro ? <AboutParagraph paragraph={method.intro} /> : null}
        <ul className="list-disc space-y-4 ps-6 text-justify text-lg leading-9 text-ink marker:text-brand">
          {method.core.map((item, index) => (
            <AboutListItem key={index} item={item} />
          ))}
        </ul>
        {method.subsections.map((section) => (
          <div key={section.title}>
            <h3 className="font-display text-xl font-semibold text-brand-darker">{section.title}</h3>
            <ol className="mt-4 list-decimal space-y-4 ps-6 text-justify text-lg leading-9 text-ink marker:font-semibold marker:text-brand">
              {section.items.map((item, index) => (
                <AboutListItem key={index} item={item} />
              ))}
            </ol>
          </div>
        ))}
      </AboutSection>

      <AboutSection id={technical.id} title={technical.title}>
        <ul className="list-disc space-y-4 ps-6 text-justify text-lg leading-9 text-ink marker:text-brand">
          {technical.items.map((item, index) => (
            <AboutListItem key={index} item={item} />
          ))}
        </ul>
      </AboutSection>
    </div>
  );
}

export function AboutPageHeader() {
  return <SectionHeader title={aboutPage.title} />;
}

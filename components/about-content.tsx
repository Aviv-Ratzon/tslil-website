import { SectionHeader } from "@/components/site";
import type { AboutNumberedSection } from "@/lib/content";
import { aboutPage } from "@/lib/content";

function NumberedSection({ title, intro, items }: AboutNumberedSection) {
  return (
    <article className="paper-panel rounded-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-brand">{title}</h2>
      {intro ? <p className="mt-4 text-lg leading-9 text-muted">{intro}</p> : null}
      <ol className="mt-5 list-decimal space-y-4 ps-6 text-lg leading-9 text-muted marker:font-semibold marker:text-brand">
        {items.map((item, index) => (
          <li key={index} className="pe-2">
            {item}
          </li>
        ))}
      </ol>
    </article>
  );
}

export function AboutContent() {
  const { goals, approach, technical } = aboutPage;

  return (
    <div className="space-y-8">
      <NumberedSection title={goals.title} items={goals.items} />

      <article className="paper-panel space-y-8 rounded-2xl p-6 sm:p-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand">{approach.title}</h2>
          {approach.intro ? <p className="mt-4 text-lg leading-9 text-muted">{approach.intro}</p> : null}
          <ol className="mt-5 list-decimal space-y-4 ps-6 text-lg leading-9 text-muted marker:font-semibold marker:text-brand">
            {approach.core.map((item, index) => (
              <li key={index} className="pe-2">
                {item}
              </li>
            ))}
          </ol>
        </div>

        {approach.subsections.map((section) => (
          <div key={section.title}>
            <h3 className="font-display text-xl font-semibold text-brand">{section.title}</h3>
            <ol className="mt-4 list-decimal space-y-4 ps-6 text-lg leading-9 text-muted marker:font-semibold marker:text-brand">
              {section.items.map((item, index) => (
                <li key={index} className="pe-2">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </article>

      <article className="paper-panel rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-brand">{technical.title}</h2>
        <ul className="mt-5 list-disc space-y-4 ps-6 text-lg leading-9 text-muted marker:text-brand">
          {technical.items.map((item, index) => (
            <li key={index} className="pe-2">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function AboutPageHeader() {
  return <SectionHeader title={aboutPage.title} />;
}

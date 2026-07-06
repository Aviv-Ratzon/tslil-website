import { ExpenseCalculator } from "@/components/expense-calculator";
import { RichParagraph } from "@/components/rich-text";
import { nextStepsPage } from "@/lib/content";

export function NextStepsTechnical() {
  const { technical } = nextStepsPage;

  return (
    <section id={technical.id} className="scroll-mt-28 border-t border-brand/10 bg-paper/40 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-10">
        <article className="paper-panel rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-brand-darker">{technical.title}</h2>
          <ul className="mt-4 list-disc space-y-4 ps-6 text-justify text-lg leading-9 text-ink marker:text-brand">
            {technical.items.map((item, index) => (
              <li key={index} className="pe-2">
                <RichParagraph paragraph={item} />
              </li>
            ))}
          </ul>
        </article>

        <ExpenseCalculator />
      </div>
    </section>
  );
}

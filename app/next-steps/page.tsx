import type { Metadata } from "next";
import diagramImage from "@/assets/diagram.png";
import { DiagramPageViewer } from "@/components/diagram-page-viewer";
import { NextStepsTechnical } from "@/components/next-steps-technical";
import { nextStepsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: nextStepsPage.title,
  description: "תרשים מפורט של הצעדים הבאים בהקמת טיפוחייה.",
};

export default function NextStepsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-brand/10 bg-paper/60 px-4 py-5 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-brand-darker sm:text-4xl">
          {nextStepsPage.title}
        </h1>
      </div>
      <DiagramPageViewer src={diagramImage} alt={nextStepsPage.imageAlt} />
      <NextStepsTechnical />
    </div>
  );
}

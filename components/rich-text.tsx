import Link from "next/link";
import type { ContentTextSegment, RichContentBlock, RichParagraph } from "@/lib/content";

export function RichText({ segments }: { segments: ContentTextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.href) {
          const isExternal = segment.href.startsWith("http");
          return (
            <Link
              key={index}
              href={segment.href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-semibold text-brand-darker underline decoration-brand/50 underline-offset-4 hover:text-brand"
            >
              {segment.text}
            </Link>
          );
        }

        if (segment.bold) {
          return (
            <strong key={index} className="font-bold">
              {segment.text}
            </strong>
          );
        }

        return <span key={index}>{segment.text}</span>;
      })}
    </>
  );
}

export function RichParagraph({ paragraph }: { paragraph: RichParagraph }) {
  if (typeof paragraph === "string") {
    return <>{paragraph}</>;
  }

  return <RichText segments={paragraph} />;
}

export function RichContentBody({ blocks }: { blocks: RichContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3
              key={index}
              className="font-display text-2xl font-semibold leading-tight text-brand-darker sm:text-3xl"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "bullets") {
          return (
            <ul key={index} className="list-disc space-y-3 ps-6 marker:text-brand-dark">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pe-2 text-xl leading-9 text-ink sm:text-2xl">
                  <RichParagraph paragraph={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-xl font-normal leading-9 text-ink sm:text-2xl">
            <RichParagraph paragraph={block.text} />
          </p>
        );
      })}
    </div>
  );
}

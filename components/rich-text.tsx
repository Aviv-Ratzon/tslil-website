import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { ContentTextSegment, RichContentBlock, RichParagraph } from "@/lib/content";

function renderTextWithLineBreaks(text: string, keyPrefix: string) {
  const parts = text.split("\n");

  return parts.map((part, partIndex) => (
    <Fragment key={`${keyPrefix}-${partIndex}`}>
      {partIndex > 0 ? <br /> : null}
      {part}
    </Fragment>
  ));
}

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
              {renderTextWithLineBreaks(segment.text, `link-${index}`)}
            </Link>
          );
        }

        if (segment.bold) {
          return (
            <strong key={index} className="font-bold">
              {renderTextWithLineBreaks(segment.text, `bold-${index}`)}
            </strong>
          );
        }

        return <span key={index}>{renderTextWithLineBreaks(segment.text, `text-${index}`)}</span>;
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
            <div
              key={index}
              className={cn(
                block.align === "center" ? "text-center" : undefined,
                block.spacingBefore === "lg" && "mt-14 sm:mt-16",
              )}
            >
              <h3 className="font-display text-2xl font-semibold leading-tight text-brand-darker sm:text-3xl">
                {block.text}
              </h3>
              {block.subtitle ? (
                <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-darker/85 sm:text-2xl">
                  {block.subtitle}
                </p>
              ) : null}
            </div>
          );
        }

        if (block.type === "bullets") {
          const isCentered = block.align === "center";
          const isSteps = block.variant === "steps";

          if (isCentered && isSteps) {
            return (
              <div key={index} className="mx-auto max-w-2xl space-y-5 text-center">
                {block.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {itemIndex > 0 ? <div className="soft-divider mx-auto my-5 w-16" aria-hidden /> : null}
                    <p className="text-xl leading-9 text-ink sm:text-2xl">
                      <RichParagraph paragraph={item} />
                    </p>
                  </div>
                ))}
              </div>
            );
          }

          if (isCentered) {
            return (
              <div key={index} className="mx-auto max-w-2xl space-y-4 text-center">
                {block.items.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-xl leading-9 text-ink sm:text-2xl">
                    <RichParagraph paragraph={item} />
                  </p>
                ))}
              </div>
            );
          }

          return (
            <ul key={index} className="list-disc space-y-3 ps-6 marker:text-brand-dark">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pe-2 text-justify text-xl leading-9 text-ink sm:text-2xl">
                  <RichParagraph paragraph={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={index}
            className={cn(
              "text-xl font-normal leading-9 text-ink sm:text-2xl",
              block.align === "center" ? "text-center" : "text-justify",
            )}
          >
            <RichParagraph paragraph={block.text} />
          </p>
        );
      })}
    </div>
  );
}

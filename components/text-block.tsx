import Link from "next/link";
import type { StaticImageData } from "next/image";
import { DiagramLightbox } from "@/components/diagram-lightbox";
import { SectionHeader } from "@/components/site";
import type { ContentTextSegment, NumberedListBlock, TextBlockBody } from "@/lib/content";

function RichText({ segments }: { segments: ContentTextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className="font-bold">
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
}

function isNumberedListBlock(body: TextBlockBody): body is NumberedListBlock {
  return typeof body === "object" && body !== null && !Array.isArray(body) && "items" in body;
}

function NumberedListContent({ content }: { content: NumberedListBlock }) {
  return (
    <div className="mt-5 space-y-5 text-lg leading-9 text-muted">
      <ol className="list-decimal space-y-4 ps-6 marker:font-semibold marker:text-brand">
        {content.items.map((item, index) => (
          <li key={index} className="pe-2">
            {typeof item === "string" ? item : <RichText segments={item} />}
          </li>
        ))}
      </ol>
      {content.closing ? <p>{content.closing}</p> : null}
      {content.formLink ? (
        <p>
          <Link
            href={content.formLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-leaf underline decoration-leaf/40 underline-offset-4 hover:text-leaf-dark"
          >
            {content.formLink.label}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function TextBlock({
  title,
  text,
  align = "center",
  image,
  imageAlt,
}: {
  title: string;
  text?: TextBlockBody;
  align?: "center" | "start";
  image?: StaticImageData;
  imageAlt?: string;
}) {
  let body: React.ReactNode;

  if (image) {
    body = <DiagramLightbox src={image} alt={imageAlt ?? title} />;
  } else if (typeof text === "string") {
    body = text;
  } else if (Array.isArray(text)) {
    body = <RichText segments={text} />;
  } else if (text && isNumberedListBlock(text)) {
    body = <NumberedListContent content={text} />;
  } else {
    body = null;
  }

  if (image) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader title={title} align={align} />
        {body}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader title={title} align={align}>
        {body}
      </SectionHeader>
    </section>
  );
}

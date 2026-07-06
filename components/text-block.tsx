import Link from "next/link";
import type { StaticImageData } from "next/image";
import { DiagramLightbox } from "@/components/diagram-lightbox";
import { RichParagraph, RichText } from "@/components/rich-text";
import { SectionHeader } from "@/components/site";
import { cn } from "@/lib/utils";
import type {
  AboutLinkChip,
  NumberedListBlock,
  NumberedListHighlightItem,
  NumberedListItem,
  TextBlockBody,
} from "@/lib/content";

function isNumberedListBlock(body: TextBlockBody): body is NumberedListBlock {
  return typeof body === "object" && body !== null && !Array.isArray(body) && "items" in body;
}

function isHighlightItem(item: NumberedListItem): item is NumberedListHighlightItem {
  return typeof item === "object" && item !== null && !Array.isArray(item) && "intro" in item && "highlight" in item;
}

function ListItemExpansion({
  children,
  display,
}: {
  children: React.ReactNode;
  display?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-3 border-s-2 border-brand/40 bg-brand-soft/50 py-3 ps-4 pe-3 sm:ps-5",
        "rounded-s-xl",
        display && "font-display text-base leading-7 text-brand-darker sm:text-[1.0625rem]",
        !display && "text-base leading-7 text-ink",
      )}
    >
      {children}
    </div>
  );
}

function ListItemContent({ item }: { item: NumberedListItem }) {
  if (isHighlightItem(item)) {
    return (
      <>
        <RichParagraph paragraph={item.intro} />
        <ListItemExpansion display>
          <RichParagraph paragraph={item.highlight} />
        </ListItemExpansion>
      </>
    );
  }

  if (typeof item === "string") {
    return <>{item}</>;
  }

  return <RichText segments={item} />;
}

function AboutLinkChips({ links }: { links: AboutLinkChip[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {links.map((link, index) => (
        <span key={link.href} className="inline-flex items-center gap-2">
          {index > 0 ? <span className="text-muted-light" aria-hidden>|</span> : null}
          <Link
            href={link.href}
            className="inline-flex rounded-full bg-leaf-soft px-3 py-1.5 text-sm font-semibold text-leaf-darker transition hover:bg-leaf-light/40 hover:text-leaf-dark"
          >
            {link.label}
          </Link>
        </span>
      ))}
    </div>
  );
}

function NumberedListContent({ content }: { content: NumberedListBlock }) {
  const lastItemIndex = content.items.length - 1;

  return (
    <div className="space-y-5">
      <ol className="list-decimal space-y-5 ps-6 text-justify marker:font-semibold marker:text-brand">
        {content.items.map((item, index) => (
          <li key={index} className="pe-2 whitespace-pre-line">
            <ListItemContent item={item} />
            {index === lastItemIndex && content.closing ? (
              <ListItemExpansion display={content.closingDisplay}>
                {typeof content.closing === "string" ? (
                  content.closing
                ) : (
                  <RichParagraph paragraph={content.closing} />
                )}
              </ListItemExpansion>
            ) : null}
          </li>
        ))}
      </ol>
      {content.formLink ? (
        <p>
          <Link
            href={content.formLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-darker underline decoration-brand/50 underline-offset-4 hover:text-brand"
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
  aboutLinks,
  align = "center",
  image,
  imageAlt,
}: {
  title: string;
  text?: TextBlockBody;
  aboutLinks?: AboutLinkChip[];
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
        {aboutLinks?.length ? <AboutLinkChips links={aboutLinks} /> : null}
      </SectionHeader>
    </section>
  );
}

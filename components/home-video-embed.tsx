export function HomeVideoEmbed({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="paper-panel overflow-hidden rounded-3xl p-2 sm:p-3">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink/5">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

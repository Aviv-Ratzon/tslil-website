import { HeroSection, ResourceCard, SectionHeader, ServiceCard, ProfileCard, ButtonLink } from "@/components/site";
import { HomeImageRotator } from "@/components/home-image-rotator";
import { providers, publicResources, services } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <SectionHeader eyebrow="המרחב שלנו" title="תמונות קטנות מתוך שפה של קשר">
            רגעים יומיומיים של משחק, קרבה, סקרנות והקשבה מזכירים לנו שהדרכת הורים מתחילה במפגש חי ופשוט.
          </SectionHeader>
        </div>
        <HomeImageRotator />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="למי אנחנו עוזרות" title="הדרכה להורים שמתמודדים עם החיים עצמם">
          אנחנו מלוות הורים סביב שאלות של תקשורת, שגרות, מעברים בבית הספר, רגעים רגשיים והצורך בקהילה יציבה.
        </SectionHeader>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {["הורים שמחפשים קצב בית רגוע יותר", "משפחות שמתמודדות עם מעבר או אי ודאות", "הורים שרוצים קשר פרטי ומכבד"].map((item) => (
            <div key={item} className="paper-panel rounded-[2rem] p-7 text-center font-display text-2xl font-semibold leading-tight text-[#21483f]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#21483f] py-20 text-[#fffaf1]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="decorative-mark text-[#d9a47e]">״</p>
          </div>
          <div className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
            <p>הורות היא לא רשימת משימות.</p>
            <p className="mt-5 text-[#d9c8ad]">היא מערכת יחסים חיה, משתנה, שזקוקה להקשבה, שפה וקהילה.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="הצוות" title="שתי נשים, משימה משותפת אחת">
            אנחנו משלבות מבנה מקצועי עם גישה חמה ומעשית שמכבדת את הפרטיות והקצב של כל משפחה.
          </SectionHeader>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {providers.map((provider) => (
              <ProfileCard key={provider.name} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="שירותים" title="שבילים שונים לליווי והעמקה" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-[#efe2cf] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="משאבים" title="טעימות ציבוריות וספרייה פרטית מעמיקה">
            חברות וחברים מאושרים יכולים לגשת למדריכים, סרטונים, מסמכים ודפי עבודה דרך ספריית משאבים מאובטחת.
          </SectionHeader>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {publicResources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="paper-panel rounded-[3rem] p-8 sm:p-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#b56f4d]">המלצות</p>
          <p className="mt-5 font-display text-3xl font-semibold leading-tight text-[#21483f] sm:text-4xl">כאן ניתן להוסיף סיפורי הורים ותוצאות לאחר אישור לפרסום.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="secondary">
              דברו איתנו
            </ButtonLink>
            <ButtonLink href="/request-access" variant="secondary">
              בקשת גישה
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

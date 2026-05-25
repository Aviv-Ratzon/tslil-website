import { ButtonLink, Card, SectionHeader } from "@/components/site";

export default function PendingApprovalPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="ממתין לאישור" title="הבקשה שלך נמצאת בבדיקה" />
      <Card className="mt-10 text-center">
        <p className="text-stone-700">
          אפשר להיכנס לחשבון, אך המשאבים הפרטיים ולוח המודעות יישארו נעולים עד שמנהלת תאשר את החשבון.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact" variant="secondary">
            דברו איתנו
          </ButtonLink>
        </div>
      </Card>
    </section>
  );
}

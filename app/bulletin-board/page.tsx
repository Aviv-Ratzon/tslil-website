import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { ButtonLink, Card, SectionHeader, StatusBadge } from "@/components/site";
import { getCurrentProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "לוח מודעות",
  description: "לוח המודעות הפרטי זמין רק לחברות וחברים מאושרים.",
};

export default async function BulletinBoardGatePage() {
  const { user, profile } = await getCurrentProfile();
  const isApprovedMember =
    profile?.approval_status === "approved" && (profile.role === "member" || profile.role === "admin");

  if (isApprovedMember) {
    redirect("/member/bulletin-board");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="לוח מודעות" title="מרחב פרטי לחברות וחברים מאושרים בלבד">
        בלוח המודעות הורים יכולים לשתף, לבקש קשר, למצוא תמיכה וליצור חיבורים בצורה שמכבדת פרטיות.
      </SectionHeader>

      <Card className="mt-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#efe2cf] text-2xl">
          <Lock className="h-7 w-7 text-[#b56f4d]" aria-hidden />
        </div>
        <h2 className="mt-6 font-display text-3xl font-semibold text-[#21483f]">
          הגישה ללוח המודעות מוגבלת
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#554936]">
          כדי לשמור על פרטיות ההורים והמשפחות, ניתן לצפות ולפרסם בלוח המודעות רק לאחר כניסה לחשבון ואישור חברות על ידי מנהלת.
        </p>

        {profile ? (
          <div className="mt-6">
            <StatusBadge label={profile.approval_status} tone={profile.approval_status === "suspended" ? "red" : "amber"} />
            <p className="mt-3 text-sm text-[#6f5a3b]">
              החשבון שלך מחובר, אך עדיין אין לו הרשאה ללוח המודעות.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {user ? (
            <ButtonLink href="/pending-approval">בדיקת סטטוס הבקשה</ButtonLink>
          ) : (
            <ButtonLink href="/login">כניסה לחשבון</ButtonLink>
          )}
          <ButtonLink href="/request-access" variant="secondary">
            בקשת גישה
          </ButtonLink>
        </div>
      </Card>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CALCULATOR_DEFAULTS,
  GUIDANCE_FEE_PER_FAMILY,
  type CalculatorInputs,
  clampCalculatorInputs,
  familyCostByChildren,
  familyCostByDays,
  formatIls,
  monthlyCaregiverSalary,
  monthlyFamilyCost,
} from "@/lib/expense-calculator";

type InputField = {
  key: keyof CalculatorInputs;
  label: string;
  min: number;
  max: number;
  step?: number;
};

const INPUT_FIELDS: InputField[] = [
  { key: "daysPerWeek", label: "כמה ימים בשבוע", min: 1, max: 6 },
  { key: "hoursPerDay", label: "כמה שעות ביום", min: 1, max: 12 },
  { key: "childrenCount", label: "כמה ילדים", min: 1, max: 12 },
  { key: "hourlyWage", label: "שכר שעתי למטפחת (₪)", min: 1, max: 500, step: 1 },
];

function BarChart({
  title,
  data,
  highlightKey,
  valueLabel,
}: {
  title: string;
  data: { key: string | number; label: string; value: number }[];
  highlightKey?: string | number;
  valueLabel: (value: number) => string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="mt-8 rounded-2xl border border-brand/15 bg-cream/40 p-4 sm:p-6">
      <h4 className="text-center font-display text-lg font-semibold text-brand-darker sm:text-xl">{title}</h4>
      <div className="mt-6 flex h-52 items-end justify-center gap-2 sm:gap-4">
        {data.map((item) => {
          const highlighted = item.key === highlightKey;
          return (
            <div key={item.key} className="flex min-w-0 flex-1 max-w-[5.5rem] flex-col items-center gap-2">
              <span
                className={cn(
                  "text-center text-[0.65rem] font-semibold tabular-nums sm:text-xs",
                  highlighted ? "text-brand-darker" : "text-ink",
                )}
              >
                {valueLabel(item.value)}
              </span>
              <div className="flex h-36 w-full items-end">
                <div
                  className={cn(
                    "w-full rounded-t-xl transition-all duration-300",
                    highlighted ? "bg-brand-darker ring-2 ring-brand/40" : "bg-brand/75",
                  )}
                  style={{ height: `${Math.max((item.value / max) * 100, 4)}%` }}
                  role="img"
                  aria-label={`${item.label}: ${valueLabel(item.value)}`}
                />
              </div>
              <span className={cn("text-center text-xs sm:text-sm", highlighted ? "font-semibold text-brand-darker" : "text-muted")}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalculatorInput({
  field,
  value,
  onChange,
}: {
  field: InputField;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{field.label}</span>
      <input
        type="number"
        min={field.min}
        max={field.max}
        step={field.step ?? 1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-xl border-2 border-brand/20 bg-paper px-4 py-2.5 text-lg font-medium tabular-nums text-ink transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
      />
    </label>
  );
}

export function ExpenseCalculator({
  id = "expense-calculator",
  className,
  title = "מחשבון עלויות משוערות להפעלת טיפוחייה במודל קלאסי",
  description = "מלאו את הערכים לפי הצורך הקבוצתי שלכם. החישוב כולל הוצאות על שכר והחזרי נסיעות למטפחת, והוצאות על הליווי.",
}: {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
}) {
  const [inputs, setInputs] = useState<CalculatorInputs>({ ...CALCULATOR_DEFAULTS });

  const values = useMemo(() => clampCalculatorInputs(inputs), [inputs]);

  const familyCost = monthlyFamilyCost(values);
  const caregiverSalary = monthlyCaregiverSalary(values);

  const byChildren = useMemo(
    () =>
      familyCostByChildren({
        daysPerWeek: values.daysPerWeek,
        hoursPerDay: values.hoursPerDay,
        hourlyWage: values.hourlyWage,
      }),
    [values.daysPerWeek, values.hoursPerDay, values.hourlyWage],
  );

  const byDays = useMemo(() => familyCostByDays(values), [values]);

  function updateField(key: keyof CalculatorInputs, raw: number) {
    setInputs((current) => ({ ...current, [key]: raw }));
  }

  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <div className="paper-panel rounded-2xl p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold text-brand-darker sm:text-3xl">{title}</h3>
        <p className="mt-3 text-justify text-base leading-8 text-muted sm:text-lg">{description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {INPUT_FIELDS.map((field) => (
            <CalculatorInput
              key={field.key}
              field={field}
              value={inputs[field.key]}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-brand/15">
          <table className="w-full min-w-[20rem] text-right text-base">
            <thead>
              <tr className="border-b border-brand/15 bg-brand-soft/60">
                <th className="px-4 py-3 font-semibold text-ink" scope="col" />
                <th className="px-4 py-3 font-semibold text-ink" scope="col">
                  ערך
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/10">
              {INPUT_FIELDS.map((field) => (
                <tr key={field.key} className="bg-paper/80">
                  <th className="px-4 py-3 font-medium text-ink" scope="row">
                    {field.label}
                  </th>
                  <td className="px-4 py-3 tabular-nums text-muted">{values[field.key]}</td>
                </tr>
              ))}
              <tr className="bg-leaf-soft/50">
                <th className="px-4 py-3 font-semibold text-brand-darker" scope="row">
                  עלות חודשית ממוצעת למשפחה
                </th>
                <td className="px-4 py-3 text-xl font-bold tabular-nums text-brand-darker">{formatIls(familyCost)}</td>
              </tr>
              <tr className="bg-brand-soft/70">
                <th className="px-4 py-3 font-semibold text-brand-darker" scope="row">
                  שכר חודשי ממוצע למטפחת
                </th>
                <td className="px-4 py-3 text-xl font-bold tabular-nums text-brand-darker">{formatIls(caregiverSalary)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted">
          כולל {formatIls(GUIDANCE_FEE_PER_FAMILY)} ליווי חודשי למשפחה. בעת 5 ימים בשבוע משתמשים במודל חלופי מהגיליון המקורי (ללא
          תלות בשכר השעתי ובשעות היום).
        </p>

        <BarChart
          title="עלות חודשית ממוצעת למשפחה לפי כמות ילדים"
          data={byChildren.map((row) => ({
            key: row.childrenCount,
            label: `${row.childrenCount}`,
            value: row.familyCost,
          }))}
          highlightKey={values.childrenCount}
          valueLabel={formatIls}
        />

        <BarChart
          title={`עלות חודשית ממוצעת למשפחה לפי ימים בשבוע (${values.childrenCount} ילדים)`}
          data={byDays.map((row) => ({
            key: row.daysPerWeek,
            label: `${row.daysPerWeek} ימים`,
            value: row.familyCost,
          }))}
          highlightKey={values.daysPerWeek}
          valueLabel={formatIls}
        />
      </div>
    </section>
  );
}

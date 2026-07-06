/** Mirrors the formulas in assets/calculator.xlsx (גיליון1). */
export const CALCULATOR_DEFAULTS = {
  daysPerWeek: 4,
  hoursPerDay: 8,
  childrenCount: 4,
  hourlyWage: 100,
} as const;

export const WEEKS_PER_MONTH = 4;
export const TRAVEL_PER_DAY = 12;
export const GUIDANCE_FEE_PER_FAMILY = 300;
export const EXTRA_WEEKLY_HOUR = 1;

/** Used in the comparison table when days per week = 5 (גיליון2, column J). */
export const FIVE_DAY_MODEL_BASE = 10000;

export type CalculatorInputs = {
  daysPerWeek: number;
  hoursPerDay: number;
  childrenCount: number;
  hourlyWage: number;
};

export function weeklyCareHours(daysPerWeek: number, hoursPerDay: number) {
  return daysPerWeek * hoursPerDay + EXTRA_WEEKLY_HOUR;
}

/** (((days×hours+1)×wage) + 12×days) × 4 — or alternate base model when days = 5. */
export function monthlyCaregiverSalary(inputs: CalculatorInputs) {
  if (inputs.daysPerWeek === 5) {
    return FIVE_DAY_MODEL_BASE + TRAVEL_PER_DAY * inputs.daysPerWeek * WEEKS_PER_MONTH;
  }

  const weeklyCost =
    weeklyCareHours(inputs.daysPerWeek, inputs.hoursPerDay) * inputs.hourlyWage +
    TRAVEL_PER_DAY * inputs.daysPerWeek;
  return weeklyCost * WEEKS_PER_MONTH;
}

/** (caregiver monthly ÷ children) + 300 */
export function monthlyFamilyCost(inputs: CalculatorInputs) {
  return monthlyCaregiverSalary(inputs) / inputs.childrenCount + GUIDANCE_FEE_PER_FAMILY;
}

export function caregiverSharePerFamily(inputs: CalculatorInputs) {
  return monthlyCaregiverSalary(inputs) / inputs.childrenCount;
}

/** Comparison grid (גיליון2) — delegates to the shared salary logic. */
export function monthlyCaregiverSalaryForDays(daysPerWeek: number, hoursPerDay: number, hourlyWage: number) {
  return monthlyCaregiverSalary({ daysPerWeek, hoursPerDay, hourlyWage, childrenCount: 1 });
}

export function monthlyFamilyCostForDays(
  daysPerWeek: number,
  hoursPerDay: number,
  hourlyWage: number,
  childrenCount: number,
) {
  return monthlyFamilyCost({ daysPerWeek, hoursPerDay, hourlyWage, childrenCount });
}

export function familyCostByChildren(
  inputs: Omit<CalculatorInputs, "childrenCount">,
  childrenCounts: number[] = [3, 4, 5, 6],
) {
  return childrenCounts.map((childrenCount) => ({
    childrenCount,
    familyCost: monthlyFamilyCost({ ...inputs, childrenCount }),
    caregiverShare: monthlyCaregiverSalary({ ...inputs, childrenCount }) / childrenCount,
  }));
}

export function familyCostByDays(
  inputs: CalculatorInputs,
  daysOptions: number[] = [3, 4, 5],
) {
  return daysOptions.map((daysPerWeek) => ({
    daysPerWeek,
    familyCost: monthlyFamilyCostForDays(
      daysPerWeek,
      inputs.hoursPerDay,
      inputs.hourlyWage,
      inputs.childrenCount,
    ),
  }));
}

export function formatIls(amount: number) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function clampCalculatorInputs(inputs: CalculatorInputs): CalculatorInputs {
  return {
    daysPerWeek: clamp(inputs.daysPerWeek, 1, 6),
    hoursPerDay: clamp(inputs.hoursPerDay, 1, 12),
    childrenCount: clamp(inputs.childrenCount, 1, 12),
    hourlyWage: clamp(inputs.hourlyWage, 1, 500),
  };
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

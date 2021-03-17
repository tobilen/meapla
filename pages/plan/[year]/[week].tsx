import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { Temporal } from "proposal-temporal";
import { Props, Weekplan } from "../../../components/Weekplan";

const parseParameter = (
  param: string | string[] | undefined
): number | null => {
  if (!param) return null;
  if (Array.isArray(param)) return null;
  return parseInt(param, 10);
};

const getWeekDates = (week: number, year: number): Props["days"] => {
  const d = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
  }).add({ weeks: week });

  const startOfWeek = d.subtract({ days: d.dayOfWeek - 1 });

  return [
    startOfWeek,
    startOfWeek.add({ days: 1 }),
    startOfWeek.add({ days: 2 }),
    startOfWeek.add({ days: 3 }),
    startOfWeek.add({ days: 4 }),
    startOfWeek.add({ days: 5 }),
    startOfWeek.add({ days: 6 }),
  ];
};

const CreatePlan: NextComponentType = () => {
  const router = useRouter();

  const year = parseParameter(router.query.year);
  const week = parseParameter(router.query.week);
  if (!year || !week) throw new Error("Malformed Request");

  return (
    <>
      <div>
        Plan for year {year} / {week}
      </div>
      <Weekplan days={getWeekDates(week, year)} />
    </>
  );
};

export default CreatePlan;

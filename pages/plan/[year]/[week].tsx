import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { Temporal } from "proposal-temporal";
import { Weekplan } from "../../../components/Weekplan";

const parseParameter = (
  param: string | string[] | undefined
): number | null => {
  if (!param) return null;
  if (Array.isArray(param)) return null;
  return parseInt(param, 10);
};

const CreatePlan: NextComponentType = () => {
  const router = useRouter();

  const year = parseParameter(router.query.year);
  const week = parseParameter(router.query.week);
  if (!year || !week) throw new Error("Malformed Request");

  const anchorDate = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
  }).add({ weeks: week });

  const startOfWeek = anchorDate.subtract({ days: anchorDate.dayOfWeek - 1 });
  const endOfWeek = startOfWeek.add({ days: 6 });

  return (
    <>
      <div>
        Plan for year {year} / {week}
      </div>
      <Weekplan from={startOfWeek} to={endOfWeek} />
    </>
  );
};

export default CreatePlan;

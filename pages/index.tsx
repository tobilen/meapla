import { NextComponentType } from "next";
import { Temporal } from "proposal-temporal";
import { Calendar } from "../components/Calendar";

const Index: NextComponentType = () => (
  <Calendar refDate={Temporal.now.plainDateISO()} />
);

export default Index;

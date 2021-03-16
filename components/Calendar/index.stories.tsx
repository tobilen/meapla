import { Story } from "@storybook/react";
import { Temporal } from "proposal-temporal";
import { Calendar } from "./index";

export default {
  title: "Calendar",
};

export const Default: Story = () => (
  <Calendar refDate={Temporal.PlainDate.from("2020-01-01T00:00:00Z")} />
);

import { Story } from "@storybook/react";
import { Temporal } from "proposal-temporal";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetPlans } from "../../queries/plan.mock";
import { Calendar } from "./index";

export default {
  title: "Calendar",
  decorators: [
    ApolloDecorator([
      mockGetPlans({
        from: "2019-09-01",
        to: "2019-12-01",
      }),
      mockGetPlans({
        from: "2019-10-01",
        to: "2020-01-01",
      }),
      mockGetPlans({
        from: "2019-11-01",
        to: "2020-02-01",
      }),
      mockGetPlans({
        from: "2019-12-01",
        to: "2020-03-01",
      }),
      mockGetPlans({
        from: "2020-01-01",
        to: "2020-04-01",
      }),
      mockGetPlans({
        from: "2020-02-01",
        to: "2020-05-01",
      }),
      mockGetPlans({
        from: "2020-03-01",
        to: "2020-06-01",
      }),
      mockGetPlans({
        from: "2020-02-01",
        to: "2020-07-01",
      }),
      mockGetPlans({
        from: "2020-03-01",
        to: "2020-08-01",
      }),
      mockGetPlans({
        from: "2020-04-01",
        to: "2020-09-01",
      }),
    ]),
  ],
};

export const Default: Story = () => (
  <Calendar refDate={Temporal.PlainDate.from("2020-01-01")} />
);

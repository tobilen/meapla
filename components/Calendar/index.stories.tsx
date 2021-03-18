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
        from: "2019-09-01T00:00:00Z",
        to: "2019-12-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2019-10-01T00:00:00Z",
        to: "2020-01-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2019-11-01T00:00:00Z",
        to: "2020-02-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2019-12-01T00:00:00Z",
        to: "2020-03-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-01-01T00:00:00Z",
        to: "2020-04-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-02-01T00:00:00Z",
        to: "2020-05-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-03-01T00:00:00Z",
        to: "2020-06-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-02-01T00:00:00Z",
        to: "2020-07-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-03-01T00:00:00Z",
        to: "2020-08-01T00:00:00Z",
      }),
      mockGetPlans({
        from: "2020-04-01T00:00:00Z",
        to: "2020-09-01T00:00:00Z",
      }),
    ]),
  ],
};

export const Default: Story = () => (
  <Calendar
    refDate={Temporal.PlainDateTime.from(
      "2020-01-01T00:00:00Z"
    ).toZonedDateTime("Etc/UTC")}
  />
);

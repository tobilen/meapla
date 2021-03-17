import { Story } from "@storybook/react";
import { Temporal } from "proposal-temporal";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetRecipes } from "../../queries/recipe.mock";
import { Props, Weekplan } from "./index";

export default {
  title: "Weekplan",
  decorators: [ApolloDecorator([mockGetRecipes()])],
};

export const Default: Story = () => {
  const days: Props["days"] = [
    Temporal.PlainDate.from("2020-01-06T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-07T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-08T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-09T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-10T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-11T00:00:00Z"),
    Temporal.PlainDate.from("2020-01-12T00:00:00Z"),
  ];

  return <Weekplan days={days} />;
};

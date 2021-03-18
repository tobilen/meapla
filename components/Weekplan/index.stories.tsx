import { Story } from "@storybook/react";
import { Temporal } from "proposal-temporal";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetRecipes } from "../../queries/recipe.mock";
import { Weekplan } from "./index";

export default {
  title: "Weekplan",
  decorators: [ApolloDecorator([mockGetRecipes()])],
};

export const Default: Story = () => (
  <Weekplan
    from={Temporal.PlainDateTime.from(
      "2020-01-06T00:00:00.000Z"
    ).toZonedDateTime("Etc/UTC")}
    to={Temporal.PlainDateTime.from("2020-01-12T00:00:00.000Z").toZonedDateTime(
      "Etc/UTC"
    )}
  />
);

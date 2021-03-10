import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Measurement } from "../../typings/graphql";
import { wrapProviders } from "../../setup/wrapProviders";
import { IngredientForm, Props } from "./index";

const onChange = jest.fn();
const onDelete = jest.fn();

const props: Props = {
  index: 0,
  ingredient: {
    id: 0,
    name: "Butter",
    amount: 10,
    measurement: Measurement.Gramm,
  },
  onChange,
  onDelete,
};

describe("IngredientForm", () => {
  it("does not trigger onChange on initial render", () => {
    render(<IngredientForm {...props} />, wrapProviders({ grommet: true }));

    expect(onChange).not.toBeCalled();
  });

  it("sends amount 0 if no number is entered", () => {
    render(<IngredientForm {...props} />, wrapProviders({ grommet: true }));

    const input = screen.getByLabelText("Amount");
    userEvent.clear(input);

    expect(onChange).toBeCalledWith({ ...props.ingredient, amount: 0 });
  });

  it("invokes callback when amount is changed", () => {
    render(<IngredientForm {...props} />, wrapProviders({ grommet: true }));

    const input = screen.getByLabelText("Amount");
    userEvent.clear(input);
    userEvent.type(input, "50");

    expect(onChange).toBeCalledWith({ ...props.ingredient, amount: 0 });
    expect(onChange).toBeCalledWith({ ...props.ingredient, amount: 5 });
    expect(onChange).toBeCalledWith({ ...props.ingredient, amount: 50 });
  });

  it("invokes callback when measurement is changed", () => {
    render(<IngredientForm {...props} />, wrapProviders({ grommet: true }));

    userEvent.click(screen.getByLabelText("Measurement"));
    userEvent.click(screen.getByText("TEASPOON"));

    expect(onChange).toBeCalledWith({
      ...props.ingredient,
      measurement: Measurement.Teaspoon,
    });
  });
});

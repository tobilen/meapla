import * as React from "react";
import { RenderOptions } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

type WrapProviders = (
  coreProviders: SupportedProviders,
  additionalProviders?: React.ElementType[]
) => RenderOptions;

type WrapReturnProviders = (
  coreProviders: SupportedProviders,
  additionalProviders?: React.ElementType[]
) => {
  options: RenderOptions;
};

export type SupportedProviders = {
  apollo?: MockedResponse[];
};

export const wrapReturnProviders: WrapReturnProviders = (
  { apollo } = {
    apollo: undefined,
  },
  additionalProviders = []
) => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    let tree = <>{children}</>;
    additionalProviders.forEach((Provider) => {
      tree = <Provider>{tree}</Provider>;
    });

    if (apollo) {
      tree = <MockedProvider mocks={apollo}>{tree}</MockedProvider>;
    }

    return tree;
  };

  return {
    options: {
      wrapper,
    },
    providers: {
      apollo,
    },
  };
};

export const wrapProviders: WrapProviders = (...args) =>
  wrapReturnProviders(...args).options;

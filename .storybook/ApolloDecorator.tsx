import { DecoratorFn } from "@storybook/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

export const ApolloDecorator: (mocks: MockedResponse[]) => DecoratorFn = (
  mocks = []
) => (story) => <MockedProvider mocks={mocks}>{story()}</MockedProvider>;

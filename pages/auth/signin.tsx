import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import { providers as getProviders } from "next-auth/client";
import { SignIn as SignInComponent } from "../../components/SignIn";
import { Wrapper } from "../../components/Page";

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type Props = {
  providers: Await<ReturnType<typeof getProviders>>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    providers: await getProviders(),
  },
});

const SignIn: NextComponentType<NextPageContext, unknown, Props> = (props) => (
  <Wrapper title="meapla - Sign in">
    <SignInComponent {...props} />
  </Wrapper>
);

export default SignIn;

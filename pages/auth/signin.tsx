import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import { providers as getProviders } from "next-auth/client";
import { SignIn as SignInComponent } from "../../components/SignIn";

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

const SignIn: NextComponentType<
  NextPageContext,
  unknown,
  Props
> = SignInComponent;

export default SignIn;

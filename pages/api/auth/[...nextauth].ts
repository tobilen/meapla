import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";
import { signInUrl } from "../../../appSettings";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    encode: async ({
      secret,
      token,
    }: {
      secret: string;
      token: User & { sub: string };
    }) => {
      const jwtClaims = {
        ...token,
        sub: token.sub,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
      return jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
    },
    decode: async ({ secret, token }: { secret: string; token: string }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      if (typeof decodedToken === "string") throw new Error("invalid token");
      return decodedToken;
    },
  },
  pages: {
    signIn: signInUrl,
  },
  callbacks: {
    session: (session, token: User & { sub: string }) => {
      if (!process.env.NEXTAUTH_JWT_SECRET)
        throw new Error("JWT Secret was not provided");

      const encodedToken = jwt.sign(token, process.env.NEXTAUTH_JWT_SECRET, {
        algorithm: "HS256",
      });

      return Promise.resolve({
        ...session,
        id: token.sub,
        token: encodedToken,
      });
    },
  },
});

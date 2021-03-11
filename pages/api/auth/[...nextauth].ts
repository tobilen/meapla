import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    // ...add more providers here
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
});

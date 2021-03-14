#!/usr/bin/env node

const { execSync } = require("child_process");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "./.env.production.local"
      : "./.env.local",
});

const url =
  process.env.NODE_ENV === "production"
    ? "https://meapla-server.herokuapp.com"
    : "http://localhost:4000";

const authorization = `Bearer ${jwt.sign(
  {
    iat: Date.now() / 1000,
    exp: Math.floor(Date.now() / 1000) + 300,
    "https://meapla.vercel.app/jwt/claims": {
      "x-ci-token": true,
    },
  },
  process.env.NEXTAUTH_JWT_SECRET || "",
  {
    algorithm: "HS256",
  }
)}`;

execSync(
  `get-graphql-schema -h 'authorization=${authorization}' "${url}" > schema.graphql`
);

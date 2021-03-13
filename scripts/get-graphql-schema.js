#!/usr/bin/env node

const { execSync } = require("child_process");
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

execSync(
  `get-graphql-schema -h 'authorization=Bearer ${process.env.INTROSPECTION_QUERY_TOKEN}' "${url}" > schema.graphql`
);

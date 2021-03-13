#!/usr/bin/env node

const { execSync } = require("child_process");
require("dotenv").config({ path: "./.env.production.local" });

execSync(
  `get-graphql-schema -h 'authorization="Bearer ${process.env.INTROSPECTION_QUERY_TOKEN}"' "https://meapla-server.herokuapp.com" > schema.graphql`
);

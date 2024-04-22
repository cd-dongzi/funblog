#!/bin/bash
source .env.default

cd apps/server

pnpm run prisma:init

MYSQL_DATABASE_URL=$MYSQL_DATABASE_URL pnpm run prisma:migrate --name update

cd ../../
FROM node:20-alpine AS base
RUN corepack enable
RUN apk add --no-cache curl 
COPY . /app
WORKDIR /app

# RUN apk add chromium

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY ./opts/package.json /app

FROM base AS deps
RUN pnpm install

FROM deps AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 8020
CMD ["sh", "-c", "pnpm run prisma:init && pnpm run prisma:deploy && pnpm run start"]

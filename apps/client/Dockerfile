FROM node:20-alpine AS base
RUN corepack enable
COPY . /app
WORKDIR /app
COPY ./opts/package.json /app

# ARG SERVER_URL
ENV DOCKER=true



FROM base AS build
RUN pnpm install && pnpm add sharp
# RUN pnpm run build


FROM base
COPY --from=build /app/node_modules /app/node_modules
# COPY --from=build /app/.next /app/.next

EXPOSE 8010
# build迁移到启动的时候运行，因为需要请求server服务，build 跟 runtime 是分开的，build是请求不到server
# CMD ["sh", "-c", "pnpm start"]
CMD ["sh", "-c", "pnpm run build && pnpm start"]



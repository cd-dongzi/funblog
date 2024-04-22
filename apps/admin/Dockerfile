FROM node:20-alpine AS base
RUN corepack enable
COPY . /app
WORKDIR /app
COPY ./opts/package.json /app



FROM base AS build
RUN pnpm install
# 如需提前build, 需要传入SERVER_URL, 因为build是部分会静态生成，读取不到SERVER_URL，无法赋值
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next

EXPOSE 8030
# CMD ["sh", "-c", "pnpm run build && pnpm start"]
CMD ["sh", "-c", "pnpm start"]



FROM oven/bun AS build

WORKDIR /cleon

COPY package.json ./
COPY bun.lock ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile
RUN bun run -F api build

FROM gcr.io/distroless/base

WORKDIR /cleon

COPY --from=build /cleon/apps/api/build/server server

ENTRYPOINT [ "./server" ]

EXPOSE 3000

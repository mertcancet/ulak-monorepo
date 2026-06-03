FROM oven/bun AS builder

WORKDIR /cleon

COPY package.json ./
COPY bun.lock ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile
RUN bun -F web build

CMD [ "bun", "-F", "web", "start" ]

EXPOSE 3000

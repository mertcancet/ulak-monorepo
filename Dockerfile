FROM oven/bun AS builder

WORKDIR /cleon

COPY package.json ./
COPY bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

CMD [ "bun", "start" ]

EXPOSE 3000

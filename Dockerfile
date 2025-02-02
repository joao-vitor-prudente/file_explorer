FROM oven/bun:1

USER bun

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

EXPOSE 3000

CMD ["bun", "run", "--hot", "./src/index.ts"]
import { serve } from "bun";
import { z } from "zod";

import { createContext } from "./context";

const server = serve({
  development: true,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  async fetch(req): Promise<Response> {
    const ctx = createContext();

    if (req.url.endsWith("/test/s3")) {
      const exists = await ctx.s3.exists("file.txt");
      const message = exists ? "File exists" : "File does not exist";
      return new Response(message, { status: 200 });
    }

    if (req.url.endsWith("/test/postgres")) {
      const versionRaw: unknown = await ctx.sql`SELECT version()`;
      console.log(versionRaw);
      const [version] = z
        .tuple([z.object({ version: z.string() })])
        .parse(versionRaw);
      return new Response(`Postgres version is ${version.version}`);
    }

    if (req.url.endsWith("/healthcheck")) {
      return new Response("Hello World!", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);

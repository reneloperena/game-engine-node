import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { fastify } from "fastify";
import routes from "./api/routes";
import env from "./env";

async function main() {
  const server = fastify({});

  server.get("/", (_, reply) => {
    reply.type("text/plain").send("Hello World!");
  });

  server.get("/ping", (_, reply) => {
    reply.type("application/json").send({ message: "pong" });
  });

  server.get("/health", async (_, reply) => {
    const isHealthy = true; // Replace with actual health checks
    reply.type("application/json").send({
      status: isHealthy ? "ok" : "unhealthy",
      timestamp: new Date().toISOString(),
    });
  });

  await server.register(fastifyConnectPlugin, {
    routes,
  });

  await server.listen({ host: "0.0.0.0", port: env.PORT });
  console.log("server is listening at", server.addresses());
}

void main();

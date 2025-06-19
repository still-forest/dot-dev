import { createServer } from "node:http";
import { NextRequest } from "next/server";

export function createTestServer(handler: (req: NextRequest) => Promise<Response>) {
  return createServer(async (req, res) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const nextRequest = new NextRequest(url, {
      method: req.method,
      headers: req.headers as any,
      body: ["POST", "PUT", "PATCH"].includes(req.method ?? "") ? (req as any) : undefined,
    });

    try {
      const response = await handler(nextRequest);
      const body = await response.text();

      // Handle different content types
      const contentType = response.headers.get("content-type");
      res.writeHead(response.status, Object.fromEntries(response.headers));

      if (contentType?.includes("application/json")) {
        res.end(body);
      } else {
        res.end(body);
      }
    } catch (_error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  });
}

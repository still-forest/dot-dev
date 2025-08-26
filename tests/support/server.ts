import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { operatorEmailUrl } from "@/lib/config";

export const handlers = [
  http.post(operatorEmailUrl, () => {
    return new HttpResponse("", { status: 204 });
  }),
];

export const server = setupServer(...handlers);

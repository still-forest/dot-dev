import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { CONTACT_SUBMISSION_URL } from "@/lib/config";

export const handlers = [
  http.post(CONTACT_SUBMISSION_URL, () => {
    return new HttpResponse("", { status: 204 });
  }),
];

export const server = setupServer(...handlers);

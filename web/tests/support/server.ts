import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { CONTACT_SUBMISSION_URL } from "@/config";

export const handlers = [
  http.post(CONTACT_SUBMISSION_URL, () => {
    return HttpResponse.json({ status: "success" });
  }),
];

export const server = setupServer(...handlers);

"use client";

import { PageNotFound } from "@still-forest/canopy";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";

export default function Page() {
  const router = useRouter();

  return (
    <Layout>
      <PageNotFound goHome={() => router.push("/")} />
    </Layout>
  );
}

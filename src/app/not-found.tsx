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

import { NextResponse } from "next/server";
import { environment } from "@/lib/config";

export async function GET() {
  return NextResponse.json({ status: "ok", environment });
}

"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { Person } from "@/types/person";

const ReportsMapInner = dynamic(() => import("./ReportsMap").then((m) => m.ReportsMap), {
  ssr: false,
  loading: () => (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <Skeleton className="h-[480px] w-full rounded-2xl" />
    </section>
  ),
});

export function ReportsMapSection({ persons }: { persons: Person[] }) {
  return <ReportsMapInner persons={persons} />;
}

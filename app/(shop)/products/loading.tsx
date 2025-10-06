// Route-level loading UI. Shows while first payload is prepared.
import { Skeleton } from "@/app/components/Skeleton";

export default function Loading() {
  return <Skeleton rows={5} />;
}

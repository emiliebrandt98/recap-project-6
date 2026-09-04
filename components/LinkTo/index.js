import Link from "next/link";

export default function LinkTo({ pathname }) {
  return <Link href={pathname}>Back to Activities List</Link>;
}

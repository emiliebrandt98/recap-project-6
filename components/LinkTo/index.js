import { ArrowLeft } from "lucide-react";

export default function LinkTo({ pathname }) {
  return <StyledLink href={pathname}>Back to Activities List</StyledLink>;
}

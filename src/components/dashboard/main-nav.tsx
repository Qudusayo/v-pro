import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center justify-around", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium text-primary transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transactions
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Beneficiaries
      </Link>
    </nav>
  );
}

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";

export default function AuthLayout({
  children,
  link,
}: {
  children: React.ReactNode;
  link: {
    href: string;
    text: string;
    direction?: "left" | "right";
  };
}) {
  return (
    <div className="container relative h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={link.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 border md:right-8 md:top-8",
        )}
      >
        {link.direction === "left" && <ChevronLeft className="mr-2 h-6 w-6" />}
        {link.text}
        {link.direction === "right" && <ArrowRight className="ml-2 h-6 w-6" />}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6 text-primary"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          TopUpLab
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}

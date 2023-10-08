import Link from "next/link";

import { UserAuthForm } from "@/components/form/user-signup-form";
import AuthLayout from "@/layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      link={{ text: "Login", href: "/auth/login", direction: "right" }}
    >
      <div className="lg:p-8">
        <div className="mx-auto flex h-[100dvh] w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-auto">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

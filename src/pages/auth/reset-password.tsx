import { UserAuthForm } from "@/components/form/reset-password-form";
import AuthLayout from "@/layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      link={{ text: "Back to login", href: "/auth/login", direction: "left" }}
    >
      <div className="lg:p-8">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-auto">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Forgot Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </AuthLayout>
  );
}

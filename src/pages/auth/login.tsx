import { UserAuthForm } from "@/components/form/user-login-form";
import AuthLayout from "@/layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      link={{ text: "Register", href: "/auth/signup", direction: "right" }}
    >
      <div className="lg:p-8">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-auto">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </AuthLayout>
  );
}

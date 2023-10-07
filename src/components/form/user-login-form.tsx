import * as React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Parse from "parse";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { push } = useRouter();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              "Invalid email address",
            )
            .required("Email is Required"),
          password: Yup.string()
            .required("Password is Required")
            .min(6, "Password must be at least 6 characters"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await Parse.User.logIn(values.email, values.password);
            push("/dashboard");
          } catch (error) {
            console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className="text-xs text-red-500">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Password</Label>
                  <Link
                    href={"/auth/reset-password"}
                    className="text-sm text-primary"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder=""
                  type="password"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className="text-xs text-red-500">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

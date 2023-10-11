import * as React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Parse from "parse";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { emailRegex, phoneRegex } from "./user-login-form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Formik
        initialValues={{
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string()
            .required("Phone Number is Required")
            .min(11, "Phone Number must be at least 11 characters")
            .max(11, "Invalid Phone Number")
            .matches(phoneRegex, "Phone Number must contain only numbers"),
          email: Yup.string()
            .matches(emailRegex, "Invalid email address")
            .required("Email is Required"),
          password: Yup.string()
            .required("Password is Required")
            .min(6, "Password must be at least 6 characters"),
          confirmPassword: Yup.string()
            .required("Confirm Password is Required")
            .nullable()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const user = new Parse.User();
            user.set("username", values.phone);
            user.set("email", values.email);
            user.set("password", values.password);
            user.set("balance", 0);

            await user.signUp();
            resetForm();

            toast({
              title: "Registration Successful",
              description: "Account created successfully.",
              action: (
                <Link href="/auth/login">
                  <ToastAction altText="Login">Login</ToastAction>
                </Link>
              ),
            });
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="07016412041"
                  type="tel"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <p className="text-xs text-red-500">
                  {errors.phone && touched.phone && errors.phone}
                </p>
              </div>
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
                <Label htmlFor="email">Password</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder=""
                  type="password"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p className="text-xs text-red-500">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up with Email
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

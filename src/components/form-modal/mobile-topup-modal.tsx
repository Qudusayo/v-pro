import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Parse from "parse";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NetworkProviderSelector from "../utils/network-provider-selector";
import { Toggle } from "../ui/toggle";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/naira-format";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProfileData, useMyStore } from "@/store/store";
import { Error, Success, Warning } from "../alert-icons/alert-icons";

const networkProviders = {
  $MTN: "mtn.png",
  $GLO: "glo.jpeg",
  $AIRTEL: "airtel.jpeg",
  $9MOBILE: "9mobile.jpeg",
};

export function MobileTopUpDialog({ children }: { children: React.ReactNode }) {
  const user: ProfileData = useMyStore((state) => state.user);
  const [transactionStatus, setTransactionStatus] = useState<
    "success" | "failed" | "pending"
  >("" as any);
  const [transactionReference, setTransactionReference] = useState("");
  const [dailogOpen, setDailogOpen] = useState(false);

  const [formStep, setFormStep] = useState(0);
  const transaction = useFormik<IAirtimeTopUp>({
    initialValues: {
      networkProvider: "" as any,
      amount: 0,
      phone: "",
    },
    validationSchema: Yup.object({
      networkProvider: Yup.string().required("Network provider is required"),
      amount: Yup.number()
        .required("Amount is required")
        .min(50, "Amount must be at least 50")
        .max(user.balance, "Insufficient balance"),
      phone: Yup.string()
        .required("Phone Number is Required")
        .min(11, "Phone Number must be at least 11 characters")
        .max(11, "Invalid Phone Number")
        .matches(/^(070|080|081|090|091)\d{8}$/, "Invalid Phone Number"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let transaction = await Parse.Cloud.run("airtime-purchase", values);
        console.log(transaction);
        setSubmitting(false);
        setFormStep(3);
        setTransactionStatus(transaction.status);
        setTransactionReference(transaction.reference);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    async function subscribeToUserUpdate() {
      if (transactionReference) {
        let txQuery = new Parse.Query("Transaction");
        txQuery.equalTo("reference", transactionReference);

        let subscription = await txQuery.subscribe();
        subscription.on("update", (tx) => {
          console.log(tx);
          setTransactionStatus(tx.get("status").toLowerCase());
        });
      }
    }
    subscribeToUserUpdate();
  }, [transactionReference]);

  const handleNext = () => {
    if (formStep === 0) {
      transaction.setTouched({
        networkProvider: true,
        amount: true,
      });
      transaction.validateForm().then((errors) => {
        const errorKeys = Object.keys(errors);
        if (
          errorKeys.length !== 0 &&
          (errorKeys.includes("networkProvider") ||
            errorKeys.includes("amount"))
        ) {
          return;
        } else {
          setFormStep((prev) => prev + 1);
        }
      });
    } else if (formStep === 1) {
      transaction.setTouched({
        phone: true,
      });
      transaction.validateForm().then((errors) => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length !== 0 && errorKeys.includes("phone")) {
          return;
        } else {
          setFormStep((prev) => prev + 1);
        }
      });
    } else if (formStep === 3) {
      setDailogOpen(false);
      transaction.resetForm();
      setFormStep(0);
    } else {
      transaction.handleSubmit();
    }
  };

  return (
    <Dialog open={dailogOpen} onOpenChange={setDailogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[100dvh] w-full flex-col overflow-x-hidden sm:h-[600px] sm:max-w-[425px]">
        <DialogHeader>
          <div
            className={cn(
              { "gap-4": formStep !== 0 },
              "flex h-auto flex-row items-center",
            )}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFormStep(formStep - 1)}
              className={cn({
                "w-0": formStep == 0 || formStep == 3,
                "opacity-0": formStep == 0 || formStep == 3,
              })}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl">
              {formStep == 0
                ? "Mobile Top Up"
                : formStep == 1
                ? "Enter Beneficiary Details"
                : formStep == 2
                ? "Review Details"
                : "Transaction Status"}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="relative flex-1 overflow-x-hidden">
          <motion.div
            className={"h-full space-y-3"}
            animate={{
              translateX: `-${formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
            style={{
              height: formStep == 0 ? "auto" : "0",
            }}
          >
            <AirtimePurchaseStep1 transaction={transaction} />
          </motion.div>
          <motion.div
            className={"left-0 right-0 top-0 h-0 space-y-3 overflow-hidden"}
            animate={{
              translateX: `${100 - formStep * 100}%`,
            }}
            style={{
              translateX: `${100 - formStep * 100}%`,
              height: formStep == 1 ? "auto" : "0",
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimePurchaseStep2 transaction={transaction} />
          </motion.div>
          <motion.div
            className={"left-0 right-0 top-0 h-0 space-y-3 overflow-hidden"}
            animate={{
              translateX: `${200 - formStep * 100}%`,
            }}
            style={{
              translateX: `${200 - formStep * 100}%`,
              height: formStep == 2 ? "auto" : "0",
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimPurchaseStep3
              networkProvider={transaction.values.networkProvider}
              amount={transaction.values.amount}
              phone={transaction.values.phone}
            />
          </motion.div>
          <motion.div
            className={"left-0 right-0 top-0 h-0 space-y-3 overflow-hidden"}
            animate={{
              translateX: `${300 - formStep * 100}%`,
            }}
            style={{
              translateX: `${300 - formStep * 100}%`,
              height: formStep == 3 ? "auto" : "0",
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimePurchaseConclusion
              networkProvider={transaction.values.networkProvider}
              amount={transaction.values.amount}
              phone={transaction.values.phone}
              status={transactionStatus}
            />
          </motion.div>
        </div>
        <DialogFooter className="mt-auto h-fit">
          <Button
            type="submit"
            className="w-full"
            onClick={handleNext}
            disabled={transaction.isSubmitting}
          >
            {transaction.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {formStep === 3 ? "Done" : formStep < 2 ? "Next" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const AirtimePurchaseStep1 = ({
  transaction,
}: {
  transaction: ReturnType<typeof useFormik<IAirtimeTopUp>>;
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
  } = transaction;

  const [selectedAmount, setSelectedAmount] = useState(0);

  return (
    <div className="grid gap-6 px-1">
      <div className="grid gap-2">
        <Label htmlFor="name">Choose Network Provider</Label>
        <NetworkProviderSelector transaction={transaction} />
        <p className="text-xs text-red-500">
          {errors.networkProvider &&
            touched.networkProvider &&
            errors.networkProvider}
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.amount}
        />
        <p className="text-xs text-red-500">
          {errors.amount && touched.amount && errors.amount}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {[50, 100, 200, 500, 1000].map((amount) => (
            <Toggle
              variant="outline"
              aria-label="Toggle italic"
              key={amount}
              pressed={selectedAmount === amount}
              className="h-8"
              onPressedChange={(pressed) => {
                if (pressed) {
                  setFieldValue("amount", amount);
                }
              }}
            >
              {amount}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
};

const AirtimePurchaseStep2 = ({
  transaction,
}: {
  transaction: ReturnType<typeof useFormik<IAirtimeTopUp>>;
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } =
    transaction;
  return (
    <div className="grid gap-6 px-1">
      <div className="grid gap-2">
        <Label htmlFor="phone">Beneficiary Phone Number</Label>
        <Input
          type="tel"
          id="phone"
          disabled={isSubmitting}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="text-xs text-red-500">
          {errors.phone && touched.phone && errors.phone}
        </p>
      </div>
      {/* <h5 className="text-md hidden w-14 border-b-2 border-primary font-normal text-muted-foreground">
        Recent
      </h5>
      <div className="hidden">
        <div className="space-y-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Ayoola Abdulqudus
              </p>
            </div>
            <div className="ml-auto font-normal text-slate-600">
              09080890930
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-8 w-8 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
            </div>
            <div className="ml-auto font-normal text-slate-600">
              09080890930
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-8 w-8 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
            </div>
            <div className="ml-auto font-normal text-slate-600">
              09080890930
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Isabella Nguyen
              </p>
            </div>
            <div className="ml-auto font-normal text-slate-600">
              09080890930
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/05.png" alt="Avatar" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
            </div>
            <div className="ml-auto font-normal text-slate-600">
              09080890930
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

const AirtimPurchaseStep3 = ({
  networkProvider,
  amount,
  phone,
}: {
  networkProvider: IAirtimeTopUp["networkProvider"];
  amount: IAirtimeTopUp["amount"];
  phone: IAirtimeTopUp["phone"];
}) => {
  return (
    <div className="px-1">
      <p className="mb-2 text-sm text-slate-600">
        Please review the details of the airtime top up and ensure they are
        correct before you proceed
      </p>
      <Card
        className="flex h-52 cursor-pointer flex-col justify-between bg-blue-200 bg-contain bg-right-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('/card-design.svg')`,
        }}
      >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between text-sm font-medium ">
            <Avatar className="mr-2 inline-block h-8 w-8 justify-center border">
              <AvatarImage
                src={
                  networkProvider
                    ? `/network-providers/${networkProviders[networkProvider]}`
                    : "/icons/logo.svg"
                }
                alt={"MTN logo"}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="text-xl font-normal">{formatNaira(amount)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 pb-9 align-bottom">
          <div>
            <p className="text-2xl font-light">{phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AirtimePurchaseConclusion = ({
  networkProvider,
  amount,
  phone,
  status,
}: {
  networkProvider: IAirtimeTopUp["networkProvider"];
  amount: IAirtimeTopUp["amount"];
  phone: IAirtimeTopUp["phone"];
  status: "success" | "failed" | "pending";
}) => {
  return (
    <div className="text-center">
      {
        {
          success: <Success />,
          failed: <Error />,
          pending: <Warning />,
        }[status]
      }
      {
        {
          success: (
            <h3 className="text-2xl font-medium">Airtime Top Up Successful</h3>
          ),
          failed: (
            <h3 className="text-2xl font-medium">Airtime Top Up Failed</h3>
          ),
          pending: (
            <h3 className="text-2xl font-medium">Airtime Top Up Processed</h3>
          ),
        }[status]
      }
      {
        {
          success: (
            <p className="mt-2 text-base text-slate-600">
              You have successfully purchased airtime worth{" "}
              <span className="font-semibold">{formatNaira(amount)}</span> for{" "}
              {phone}
            </p>
          ),
          failed: (
            <p className="mt-2 text-base text-slate-600">
              Your airtime top up request worth{" "}
              <span className="font-semibold">{formatNaira(amount)}</span> for{" "}
              {phone} failed
            </p>
          ),
          pending: (
            <p className="mt-2 text-base text-slate-600">
              Your airtime top up request worth{" "}
              <span className="font-semibold">{formatNaira(amount)}</span> for{" "}
              {phone} is being processed
            </p>
          ),
        }[status]
      }
      <div className="mt-6">
        <Button variant="outline" className="m-auto block text-base">
          View Transaction
        </Button>
        <Button variant="link" className="mt-4">
          Save Beneficiary ?
        </Button>
      </div>
    </div>
  );
};

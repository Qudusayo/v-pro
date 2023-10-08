import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkProviderSelector from "../utils/network-provider-selector";
import { Toggle } from "../ui/toggle";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function MobileTopUpDialog({ children }: { children: React.ReactNode }) {
  const [formStep, setFormStep] = useState(0);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setFormStep(0);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[100dvh] flex-col overflow-x-hidden sm:h-[550px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mobile TopUp</DialogTitle>
          <DialogDescription>Hello World</DialogDescription>
        </DialogHeader>
        <div className="relative flex-1 overflow-x-hidden">
          <motion.div
            className={cn("h-full space-y-3", {
              // hidden: formStep == 1,
            })}
            // formStep == 0 -> translateX == 0
            // formStep == 1 -> translateX == '-100%'
            animate={{
              translateX: `-${formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimePurchaseStep1 />
          </motion.div>
          <motion.div
            className={cn("absolute left-0 right-0 top-0 h-full space-y-3", {
              // hidden: formStep == 0,
            })}
            // formStep == 0 -> translateX == 100%
            // formStep == 1 -> translateX == 0
            animate={{
              translateX: `${100 - formStep * 100}%`,
            }}
            style={{
              translateX: `${100 - formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimePurchaseStep2 />
          </motion.div>
          <motion.div
            className={cn("absolute left-0 right-0 top-0 space-y-3", {
              // hidden: formStep == 0,
            })}
            // formStep == 0 -> translateX == 100%
            // formStep == 1 -> translateX == 0
            animate={{
              translateX: `${200 - formStep * 100}%`,
            }}
            style={{
              translateX: `${200 - formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <AirtimPurchaseStep3 />
          </motion.div>
        </div>
        <DialogFooter className="mt-auto h-fit">
          <Button
            type="submit"
            className="w-full"
            onClick={() => setFormStep(formStep + 1)}
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const AirtimePurchaseStep1 = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Choose Network Provider</Label>
        <NetworkProviderSelector />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" defaultValue="" />
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
                  setSelectedAmount(amount);
                } else {
                  setSelectedAmount(0);
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

const AirtimePurchaseStep2 = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="beneficiary">Beneficiary Phone Number</Label>
        <Input type="tel" id="beneficiary" defaultValue="" />
      </div>
      <h5 className="text-md w-14 border-b-2 border-primary font-normal text-muted-foreground">
        Recent
      </h5>
      <div>
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
      </div>
    </div>
  );
};

const AirtimPurchaseStep3 = () => {
  return (
    <div>
      <h2>Confirmation</h2>
    </div>
  );
};

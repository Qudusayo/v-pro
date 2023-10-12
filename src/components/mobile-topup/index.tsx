import React from "react";
import { ArrowRight, Wallet2, Wifi } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileTopUpDialog } from "../form-modal/mobile-topup-modal";

export default function MobileTopUp() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MobileTopUpDialog>
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Wallet2 />
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6 flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <div className="text-2xl font-semibold">Buy Airtime</div>
              <p className="text-xs text-muted-foreground">All networks</p>
            </div>
            <ArrowRight />
          </CardContent>
        </Card>
      </MobileTopUpDialog>
      <MobileTopUpDialog>
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              <Wifi />
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6 flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <div className="text-2xl font-semibold">Buy Data</div>
              <p className="text-xs text-muted-foreground">All networks</p>
            </div>
            <ArrowRight />
          </CardContent>
        </Card>
      </MobileTopUpDialog>
    </div>
  );
}

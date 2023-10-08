import Parse from "parse";
import React from "react";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";

import withAuth from "@/hoc/withAuth";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";

import { formatNaira } from "@/lib/naira-format";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileTopUp from "@/components/mobile-topup";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TransactionTable } from "@/components/transaction-table/transaction-table";
import { FundWallet } from "@/components/form-modal/fund-wallet-modal";

function Dashboard() {
  const { push } = useRouter();

  return (
    <div>
      <div className="sticky top-0 z-30 border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <div className="text-md relative z-20 flex flex-1 items-center font-medium">
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
            {/* TopUpLab */}
          </div>
          <MainNav className="flex-grow" />
          <div className="ml-auto flex flex-1 items-center justify-end space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="mt-5 flex items-center justify-between space-y-2">
          <div>
            <span className="mb-4 text-sm font-medium text-muted-foreground">
              Total Balance
            </span>
            <h2 className="text-4xl font-medium tracking-tight">
              {formatNaira(0)}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <FundWallet />
          </div>
        </div>
        <Tabs defaultValue="mobile-topup" className="space-y-4 py-20">
          <TabsList>
            <TabsTrigger value="mobile-topup">Mobile Top Up</TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Airtime to Cash
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Pay Bills
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mobile-topup" className="space-y-4">
            <MobileTopUp />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-md w-fit font-medium">Recent Transactions</h2>
            <Button
              variant="ghost"
              onClick={() => push("/transactions")}
              className="inline-block text-sm  font-medium"
            >
              View all
              <ArrowRight className="ml-2 inline-block h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <TransactionTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);

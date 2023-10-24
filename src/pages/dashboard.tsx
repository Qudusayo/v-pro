import Parse from "parse";
import React, { useEffect, useState } from "react";
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
import { useMyStore } from "@/store/store";
import Image from "next/image";

function Dashboard() {
  const { push } = useRouter();
  const user = useMyStore((state) => state.user);
  const setUser = useMyStore((state) => state.setUser);
  let parseUser = Parse.User.current();

  async function updateUser(id: string) {
    const query = new Parse.Query(Parse.User);
    query.get(id).then((user) => {
      setUser({
        balance: user.get("balance"),
        email: user.get("email"),
        username: user.get("username"),
      });
    });
  }

  useEffect(() => {
    async function subscribeToUserUpdate() {
      if (parseUser) {
        await updateUser(parseUser.id);

        let txQuery = new Parse.Query("Transaction");
        txQuery.equalTo("user", parseUser);

        let subscription = await txQuery.subscribe();
        subscription.on("create", (tx) => updateUser(tx.get("user").id));
        subscription.on("update", (tx) => updateUser(tx.get("user").id));
      }
    }
    subscribeToUserUpdate();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-30 border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <div className="text-md relative z-20 flex flex-1 items-center font-medium">
            <Image alt="logo" src="/icons/logo.svg" width={25} height={25} />
          </div>
          <MainNav className="flex-grow" />
          <div className="ml-auto flex flex-1 items-center justify-end space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-3 pt-6 sm:p-8">
        <div className="mt-5 flex items-center justify-between space-y-2">
          <div>
            <span className="mb-4 text-sm font-medium text-muted-foreground">
              Total Balance
            </span>
            <h2 className="text-4xl font-medium tracking-tight">
              {formatNaira(user?.balance ?? 0)}
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

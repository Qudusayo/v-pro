import Parse from "parse";
import React from "react";
import { useRouter } from "next/router";

import withAuth from "@/hoc/withAuth";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { push } = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        onClick={() => {
          push("/auth/login");
          Parse.User.logOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default withAuth(Dashboard);

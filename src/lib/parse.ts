import Parse from "parse";

Parse.initialize(process.env.NEXT_PUBLIC_APP_ID!);
Parse.serverURL = process.env.NEXT_PUBLIC_SERVER_URL!;

interface IAirtimeTopUp {
  networkProvider: "9mobile" | "airtel" | "globacom" | "mtn";
  amount: number;
  phone: string;
}

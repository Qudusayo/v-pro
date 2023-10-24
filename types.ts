interface IAirtimeTopUp {
  networkProvider: "$MTN" | "$GLO" | "$AIRTEL" | "$9MOBILE";
  amount: number;
  phone: string;
}

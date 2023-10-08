const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  currencyDisplay: "symbol",
});

export const formatNaira = (amount: number) => {
  return nairaFormatter.format(amount);
};

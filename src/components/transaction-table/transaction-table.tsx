import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/format-date";
import { formatNaira } from "@/lib/naira-format";
import { useEffect, useState } from "react";
import Parse from "parse";

export function TransactionTable() {
  const [transactions, setTransactions] = useState<
    {
      id: string;
      date: string;
      type: string;
      description: string;
      invoice: string;
      status: string;
      amount: number;
      paymentMethod: string;
      reference: string;
    }[]
  >([]);

  useEffect(() => {
    let transactions = new Parse.Query("Transaction");
    transactions.equalTo("user", Parse.User.current());
    transactions.limit(10);
    transactions.descending("createdAt");
    transactions.find().then((transactions) => {
      let tx = transactions.map((transaction) => {
        return {
          id: transaction.id,
          date: formatDate(transaction.get("createdAt")),
          type: transaction.get("type"),
          description: transaction.get("description"),
          invoice: transaction.get("invoice"),
          status: transaction.get("status"),
          amount: transaction.get("amount"),
          paymentMethod: transaction.get("paymentMethod"),
          reference: transaction.get("reference"),
        };
      });
      setTransactions(tx);
    });
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Reference ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.date}</TableCell>
            <TableCell className="font-medium">{transaction.type}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.reference}</TableCell>
            <TableCell>{transaction.status}</TableCell>
            <TableCell className="text-right">
              {formatNaira(transaction.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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

const invoices = [
  {
    date: formatDate(new Date()),
    category: "Airtime Purchase",
    description: "Bought MTN airtime 100 - 08012345678",
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: 250,
    paymentMethod: "Credit Card",
    referenceID: "MTN|2023100810|24TF35KCWR",
  },
];

export function TransactionTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Reference ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.date}</TableCell>
            <TableCell className="font-medium">{invoice.category}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.referenceID}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell className="text-right">
              {formatNaira(invoice.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

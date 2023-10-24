import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";

export default function NetworkProviderSelector({
  transaction,
}: {
  transaction: ReturnType<typeof useFormik<IAirtimeTopUp>>;
}) {
  return (
    <Select
      onValueChange={(value) =>
        transaction.setFieldValue("networkProvider", value)
      }
      value={transaction.values.networkProvider}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select network provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Network Providers</SelectLabel>
          <SelectItem value="$9MOBILE">
            <div className="flex flex-row items-center">
              <Avatar className="mr-2 inline-block h-6 w-6 justify-center border">
                <AvatarImage
                  src={`/network-providers/9mobile.jpeg`}
                  alt={"9Mobile logo"}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span>9Mobile</span>
            </div>
          </SelectItem>
          <SelectItem value="$AIRTEL">
            <div className="flex flex-row items-center">
              <Avatar className="mr-2 inline-block h-6 w-6 justify-center border">
                <AvatarImage
                  src={`/network-providers/airtel.jpeg`}
                  alt={"Airtel logo"}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span>Airtel</span>
            </div>
          </SelectItem>
          <SelectItem value="$GLO">
            <div className="flex flex-row items-center">
              <Avatar className="mr-2 inline-block h-6 w-6 justify-center border">
                <AvatarImage
                  src={`/network-providers/glo.jpeg`}
                  alt={"Glo logo"}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span>Globacom</span>
            </div>
          </SelectItem>
          <SelectItem value="$MTN">
            <div className="flex flex-row items-center">
              <Avatar className="mr-2 inline-block h-6 w-6 justify-center border">
                <AvatarImage
                  src={`/network-providers/mtn.png`}
                  alt={"MTN logo"}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span>MTN</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

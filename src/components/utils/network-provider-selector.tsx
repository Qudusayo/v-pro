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

export default function NetworkProviderSelector() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select network provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Network Providers</SelectLabel>
          <SelectItem value="blueberry">
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
          <SelectItem value="grapes">
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
          <SelectItem value="apple">
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
          <SelectItem value="banana">
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

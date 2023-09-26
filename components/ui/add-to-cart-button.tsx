import React from "react";
import { Button } from "./button";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { FaCartPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartButtonProps {
  disable?: boolean;
  classname?: string;
  showText?: boolean;
  onClick: () => void;
  isLogin: boolean;
}

const AddToCartButton = ({
  disable = false,
  classname,
  showText,
  onClick,
  isLogin,
}: AddToCartButtonProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Button
            className={cn("space-x-3 select-none w-full", classname)}
            disabled={disable}
            onClick={() => onClick()}
          >
            <FaCartPlus />
            {showText && <p className="font-semibold"> Add to cart</p>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isLogin ? "Add to cart" : "You need to login to use this feauture"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToCartButton;

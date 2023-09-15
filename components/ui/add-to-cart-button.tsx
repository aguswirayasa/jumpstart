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
}

const AddToCartButton = ({
  disable = false,
  classname,
  showText,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Button
            className={cn("space-x-3 select-none w-full", classname)}
            disabled={disable}
            onClick={() => onClick()}
          >
            <FaCartPlus />
            {showText && <p className="font-semibold">Add to cart</p>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToCartButton;

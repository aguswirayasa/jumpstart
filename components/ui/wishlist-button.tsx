import React from "react";
import { Button } from "./button";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

interface WishlistButtonProps {
  disable?: boolean;
  classname?: string;
  showText?: boolean;
  onClick: () => void;
  isLoading?: boolean;
  isWished?: boolean;
  isLogin: boolean;
}

const WishlistButton = ({
  disable = false,
  classname,
  showText,
  onClick,
  isLoading,
  isWished,
  isLogin,
}: WishlistButtonProps) => {
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
            {isLoading ? (
              <>
                <Loader2 className="animate-spin " />
                <p className="font-semibold">Loading...</p>
              </>
            ) : (
              <>
                <BsFillBookmarkPlusFill />
                {showText && (
                  <p className="font-semibold">
                    {isWished ? "Remove wishlist" : "Add to wishlist"}
                  </p>
                )}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isLogin
              ? "Add or remove wishlist"
              : "You need to login to use this feauture"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WishlistButton;

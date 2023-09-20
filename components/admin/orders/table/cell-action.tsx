"use client";

import axios from "axios";
import { Copy, Edit, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OrdersColumn } from "./columns";
import { DeliveryModal } from "@/components/modal/delivery-modal";

interface CellActionProps {
  data: OrdersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="flex gap-3 text-white text-xl">
            <Loader2 className="animate-spin" />
            <p>Updating status...</p>
          </div>
        </div>
      )}
      {data.status === "COMPLETED" ? (
        <p>Completed at {data.completedDate}</p>
      ) : (
        <DeliveryModal
          orderId={data.id}
          isLoading={loading}
          setIsLoading={setLoading}
          orderStatus={data.status}
        />
      )}
    </>
  );
};

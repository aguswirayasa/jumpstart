"use client";

import axios from "axios";
import {
  Archive,
  Copy,
  Edit,
  Loader2,
  MoreHorizontal,
  Trash,
} from "lucide-react";
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

import { ProductColumn } from "./columns";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState("");

  const onConfirm = async () => {
    try {
      setMessage("Deleting product...");
      setLoading(true);
      const response = await axios.delete(
        `/api/admin/product/${data.id}/delete/`
      );
      if (response.status === 200) {
        toast.success("Product deleted.");
      } else if (response.status === 400) {
        toast.error(
          "You can't delete this product, because there's an order for this product"
        );
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpen(false);
      setMessage("");
      router.refresh();
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard.");
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="flex gap-3 text-white text-xl">
            <Loader2 className="animate-spin" />
            <p>{message}</p>
          </div>
        </div>
      )}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${data.id}/update`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${data.id}/restock`)}
          >
            <Archive className="mr-2 h-4 w-4" /> Restock
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

import React, { useState } from "react";
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
import { MoreHorizontal, Trash, Edit, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import { BannersColumn } from "./columns";

interface CellActionProps {
  data: BannersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setMessage("Deleting banner...");
      setLoading(true);
      await axios.delete(`/api/admin/banner/delete/${data.id}`);
      toast.success("Banner deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
      setMessage("");
      router.refresh();
    }
  };

  const updateStatus = async () => {
    try {
      setMessage(
        data.active ? "Deactivating banner..." : "Activating banner..."
      );
      setLoading(true);

      // Make your asynchronous request
      await axios.post(`/api/admin/banner/update/${data.id}`, {
        status: data.active,
      });

      // Show a success toast
      toast.success("Status updated successfully!");
    } catch (error) {
      // Show an error toast with the error message
      toast.error(`Something went wrong, please try again`);
    } finally {
      setLoading(false);
      setMessage("");
      router.refresh();
    }
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

          <DropdownMenuItem onClick={updateStatus}>
            <Edit className="mr-2 h-4 w-4" />
            {data.active ? "Deactivated" : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

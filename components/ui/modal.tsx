"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./button";
import { useHydration } from "@/hooks/useHydration";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  buttonLabel: string;
}

const Modal = ({ children, title, buttonLabel }: ModalProps) => {
  const isMounted = useHydration();
  return (
    <>
      {isMounted && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"default"}>{buttonLabel}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div>{children}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Modal;

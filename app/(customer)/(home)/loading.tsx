import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="flex flex-col justify-center mx-5 lg:mx-20 my-10 ">
      <Skeleton className="w-full h-[400px]" />

      <div className="grid grid-cols-12 gap-x-3 h-[300px] w-full mt-10 place-items-center">
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-12 gap-x-3 h-[300px] w-full place-items-center">
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
        <Skeleton className="col-span-6 md:col-span-4 lg:col-span-2 w-full h-full " />
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-8 h-[300px] w-full place-items-center">
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
        <Skeleton className="col-span-4 md:col-span-2 lg:col-span-1 w-full h-full " />
      </div>
    </main>
  );
}

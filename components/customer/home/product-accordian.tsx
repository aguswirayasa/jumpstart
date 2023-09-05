"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductAccordianProps {
  description: string;
}

const ProductAccordian = ({ description }: ProductAccordianProps) => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        className="shadow-lg border-2 border-gray-2 rounded-lg"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Product Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Product Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Product Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductAccordian;

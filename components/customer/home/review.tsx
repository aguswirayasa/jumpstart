"use client";

import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { AiTwotoneStar } from "react-icons/ai";
import CustomIcon from "@/components/ui/icons";
const Review = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <Rating initialValue={5} size={20} />
    </div>
  );
};

export default Review;

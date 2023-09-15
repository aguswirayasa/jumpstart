"use client";

import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
interface ReviewProps {
  rating: number;
}
const Review = ({ rating }: ReviewProps) => {
  return (
    <div>
      <Rating initialValue={rating} allowFraction readonly size={20} />
    </div>
  );
};

export default Review;

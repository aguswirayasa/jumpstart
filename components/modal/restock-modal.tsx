"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "../ui/modal";
import { Rating } from "react-simple-star-rating";
import { Badge } from "../ui/badge";
import axios from "axios";
import { ReviewRequest } from "@/types";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface ReviewModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const RestockModal: React.FC<ReviewModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  useEffect(() => {
    const getProductById = async (productId: string) => {
      try {
        const res = await axios.get(
          `/api/admin/product/get-product/${productId}`
        );
        console.log(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById(productId);
  }, []);
  const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setReviewText(e.target.value);
  };
  const reviewMutation = useMutation(
    async (review: ReviewRequest) => {
      const response = await axios.post("/api/review", review);

      if (response.status === 200) {
        toast.success("Review posted successfully");
      } else {
        toast.error("Something went wrong, please try again");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reviews");
        setRating(0);
        setReviewText("");
        setOpen(false);
        router.refresh();
      },
      onError: () => {
        toast.error("Something went wrong, please try again");
      },
    }
  );

  const onSubmit = async (data: ReviewRequest) => {
    if (data.rating > 0 && data.comment.trim() !== "") {
      reviewMutation.mutate(data);
    } else {
      setError("Please provide both rating and review text");
    }
  };

  return (
    <>
      <Modal
        title="Leave a Review"
        description="We'd love to hear your feedback! Please leave a review for this product."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <span>Your Rating: {rating}</span>
            <Rating initialValue={rating} size={24} onClick={handleRating} />
          </div>
          <Input
            type="text"
            placeholder="Write your review..."
            value={reviewText}
            onChange={handleReviewTextChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end">
            <Button className="flex gap-1">
              {reviewMutation.isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Loading...</p>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RestockModal;

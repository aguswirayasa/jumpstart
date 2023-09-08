import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

interface CustomIconProps {
  icon: IconType; // Pass the icon component as a prop
  size?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  icon: Icon,
  size = "24px",
  color = "text-black",
  onClick,
  className,
}) => {
  const iconStyle = {
    fontSize: size,
    cursor: "pointer",
  };

  return (
    <span
      onClick={onClick}
      className={cn(`cursor-pointer select-none ${color}`, className)}
    >
      <Icon style={iconStyle} />
    </span>
  );
};

export default CustomIcon;

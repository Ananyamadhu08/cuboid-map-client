import React, { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-64 ${className}`}
      role="region"
      aria-label="Card container"
    >
      {children}
    </div>
  );
};

export default Card;

import React, { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "avatar";
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  imgSrc?: string;
  imgAlt?: string;
}

const Avatar: React.FC<{ imgSrc?: string; imgAlt: string }> = ({
  imgSrc,
  imgAlt,
}) => {
  const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

  // TODO: check why icon is not rendering
  return (
    <img
      src={imgSrc || defaultAvatar}
      alt={imgAlt}
      className="h-full w-full rounded-full object-cover"
    />
  );
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
  imgSrc,
  imgAlt = "avatar",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg focus:outline-none transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    avatar: "w-8 h-8 p-0 bg-transparent",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabledClasses}`}
      disabled={disabled}
      aria-label={variant === "avatar" ? imgAlt : undefined}
    >
      {variant === "avatar" ? (
        <Avatar imgSrc={imgSrc} imgAlt={imgAlt} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const CommonButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={`w-full gap-2 mt-4 break-words cursor-pointer font-medium py-3 px-4 rounded-md focus:ring-2 transition-colors focus:ring-offset-2 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CommonButton;

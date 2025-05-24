import React from "react";
import {CommonButtonProps} from "../../../../domain/types/components/commonButtonTypes";


const CommonButton = ({ className, children, onClick,dataTestId }: CommonButtonProps) => {
  return (
    <button
      className={`w-full gap-2 mt-4 break-words cursor-pointer font-medium py-3 px-4 rounded-md focus:ring-2 transition-colors focus:ring-offset-2 focus:outline-none ${className}`}
      onClick={onClick}
      data-testid={`common-button-${dataTestId}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;

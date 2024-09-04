import React, { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
        <div className="relative z-10 p-2 text-xs leading-none text-white bg-black shadow-lg rounded-md whitespace-nowrap">
          {message}
        </div>
        <div className="w-3 h-3 mt-1 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};

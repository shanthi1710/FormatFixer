import React from "react";
import { Input } from "@/components/ui/input";
import { IoInformationCircleOutline } from "react-icons/io5";
import ToolTip from "@/components/ToolTip";

interface InputWithValidationProps {
  value: string;
  field: string;
  invalid: boolean;
  originalIndex: number;
  invalidUrls: Record<number, Record<string, boolean>>; // Ensure this matches
  handleInputChange: (
    originalIndex: number,
    field: string,
    value: string
  ) => void;
}

const InputWithValidation: React.FC<InputWithValidationProps> = ({
  value,
  field,
  originalIndex,
  invalidUrls,
  handleInputChange,
}) => {
  return (
    <div className="relative">
      <Input
        value={value || ""} // Ensure the value is never undefined
        onChange={(e) =>
          handleInputChange(originalIndex, field, e.target.value)
        }
        className={`border-none w-full pr-10 rounded-none outline-transparent ${
          !value.trim() || invalidUrls[originalIndex]?.[field]
            ? "bg-red-200"
            : ""
        }`}
      />
      {(!value.trim() || invalidUrls[originalIndex]?.[field]) && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-50">
          <span className="text-black cursor-pointer">
            <ToolTip
              tooltip={
                !value.trim() ? `Missing ${field}` : `${field} URL is incorrect`
              }
            >
              <IoInformationCircleOutline />
            </ToolTip>
          </span>
        </div>
      )}
    </div>
  );
};

export default InputWithValidation;

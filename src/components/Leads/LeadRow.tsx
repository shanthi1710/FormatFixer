import React from "react";
import InputWithValidation from "./InputWithValidation";
import { Lead, invalidUrlsType } from "./types";

interface LeadRowProps {
  lead: Lead;
  originalIndex: number;
  index: number;
  invalidUrls: invalidUrlsType;
  handleInputChange: (
    originalIndex: number,
    field: string,
    value: string
  ) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({
  lead,
  originalIndex,
  index,
  invalidUrls,
  handleInputChange,
}) => {
  return (
    <tr>
      <td className="border border-slate-100 p-2 ml-3 bg-slate-200">
        {index + 1}
      </td>
      {Object.entries(lead).map(([key, value]) => (
        <td key={key} className="border p-0">
          <InputWithValidation
            value={value || ""}
            field={key}
            invalid={invalidUrls[originalIndex]?.[key] || false}
            originalIndex={originalIndex}
            invalidUrls={invalidUrls} // Add this line
            handleInputChange={handleInputChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default LeadRow;

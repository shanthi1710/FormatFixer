import React from "react";
import { Lead, invalidUrlsType } from "./types";
import LeadRow from "./LeadRow";
import { Switch } from "@/components/ui/switch";
import { RiInformationOffLine } from "react-icons/ri";
import ToolTip from "../ToolTip";
import { Button } from "../ui/button";

interface EditTableProps {
  leads: Lead[];
  filteredLeads: { lead: Lead; originalIndex: number }[];
  emptyFields: { [key: string]: number };
  invalidUrls: invalidUrlsType;
  showOnlyInvalid: boolean;
  setShowOnlyInvalid: (value: boolean) => void;
  handleInputChange: (
    originalIndex: number,
    field: string,
    value: string
  ) => void;
}

const EditTable: React.FC<EditTableProps> = ({
  leads,
  filteredLeads,
  emptyFields,
  invalidUrls,
  showOnlyInvalid,
  setShowOnlyInvalid,
  handleInputChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit Values</h2>
        <div className="flex items-center pt-3">
          <span className="mr-2">Only show leads with invalid values</span>
          <Switch
            checked={showOnlyInvalid}
            onCheckedChange={setShowOnlyInvalid}
          />
        </div>
      </div>
      <p>Edit contact and correct only invalid values</p>

      <div className="space-y-6 mt-6">
        {filteredLeads.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border border-slate-100 size-10 ml-3 bg-slate-200">
                  Sr.No
                </th>
                {Object.keys(leads[0]).map((key) => (
                  <th
                    key={key}
                    className="text-left p-2 border border-slate-100 bg-slate-200"
                  >
                    <div className="flex items-center">
                      {key}
                      {emptyFields[key] > 0 && (
                        <span className="ml-2 flex items-center text-red-500 gap-1 text-sm z-50 cursor-pointer">
                          <ToolTip
                            tooltip={`${emptyFields[key]} leads have empty <br/> in their ${key}`}
                          >
                            <RiInformationOffLine />
                          </ToolTip>
                          <span className="mr-1 gap-1">{emptyFields[key]}</span>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(({ lead, originalIndex }, index) => (
                <LeadRow
                  key={originalIndex}
                  lead={lead}
                  originalIndex={originalIndex}
                  index={index}
                  invalidUrls={invalidUrls}
                  handleInputChange={handleInputChange}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leads to display.</p>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => {
            console.log("Continue clicked");
            console.log("Edited Leads Data:", filteredLeads);
          }}
          className="px-4 py-2 bg-purple-500 text-white text-lg rounded-md"
          disabled={filteredLeads.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EditTable;

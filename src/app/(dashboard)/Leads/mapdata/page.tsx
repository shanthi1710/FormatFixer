"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
//import { clearCsvData } from "../../../../lib/store/csvDataSlice";
import { RootState } from "@/lib/store/store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiInformationOffLine } from "react-icons/ri";
import ToolTip from "@/components/ToolTip";
type Lead = {
  [key: string]: string | undefined;
};

const isValidURLFORLinkedIn = (url: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i;

  try {
    const parsedUrl = new URL(url);
    const isHttpOrHttps =
      parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";

    const isLinkedInDomain = regex.test(parsedUrl.href);

    return isHttpOrHttps && isLinkedInDomain;
  } catch (e) {
    return false;
  }
};
//console.log("isValidURLFORLinkedIn:->", isValidURLFORLinkedIn);

const isValidURLFORCompanyDomain = (url: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?([\w.-]+\.)?[\w-]+\.com(\/.*)?$/i;
  if (!regex.test(url)) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (e) {
    return false;
  }
};
//console.log("isValidURLFORCompanyDomain:->", isValidURLFORCompanyDomain);

const SetupPage: React.FC = () => {
  const leads = useSelector((state: RootState) => state.csvData.data);
  const router = useRouter();
  const [editableLeads, setEditableLeads] = useState<Lead[]>([]);
  const [emptyFields, setEmptyFields] = useState<{ [key: string]: number }>({});
  const [invalidUrls, setInvalidUrls] = useState<{
    [index: number]: { [key: string]: boolean };
  }>({});
  const [showOnlyInvalid, setShowOnlyInvalid] = useState(false);

  //console.log("emptyFields:-->", emptyFields);

  const goBackHandler = () => {
    router.push("/Leads/Lead%20List%202");
  };

  useEffect(() => {
    if (leads.length) {
      setEditableLeads(leads);
      calculateEmptyFields(leads);
      validateUrls(leads);
    }
  }, [leads]);

  const calculateEmptyFields = (data: Lead[]) => {
    const counts: { [key: string]: number } = {};
    data.forEach((lead) => {
      Object.keys(lead).forEach((key) => {
        if (!lead[key]?.trim()) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });
    setEmptyFields(counts);
  };

  const validateUrls = (data: Lead[]) => {
    const urlErrors: { [index: number]: { [key: string]: boolean } } = {};
    data.forEach((lead, index) => {
      const urlErrorsForLead: { [key: string]: boolean } = {};
      if (lead["linkdin"] && !isValidURLFORLinkedIn(lead["linkdin"])) {
        urlErrorsForLead["linkdin"] = true;
      }
      if (
        lead["compnay domain"] &&
        !isValidURLFORCompanyDomain(lead["compnay domain"])
      ) {
        urlErrorsForLead["compnay domain"] = true;
      }
      if (Object.keys(urlErrorsForLead).length > 0) {
        urlErrors[index] = urlErrorsForLead;
      }
    });
    setInvalidUrls(urlErrors);
  };

  const handleInputChange = (
    originalIndex: number,
    field: string,
    value: string
  ) => {
    const updatedLeads = [...editableLeads];
    const prevValue = updatedLeads[originalIndex][field];

    updatedLeads[originalIndex] = {
      ...updatedLeads[originalIndex],
      [field]: value,
    };
    setEditableLeads(updatedLeads);

    const updatedEmptyFields = { ...emptyFields };
    if (!value.trim()) {
      updatedEmptyFields[field] = (updatedEmptyFields[field] || 0) + 1;
    } else if (!prevValue?.trim()) {
      updatedEmptyFields[field] = Math.max(
        (updatedEmptyFields[field] || 0) - 1,
        0
      );
    }

    const updatedInvalidUrls = { ...invalidUrls };
    if (field === "compnay domain") {
      const isUrlValidCompany = isValidURLFORCompanyDomain(value);
      if (!isUrlValidCompany) {
        if (!updatedInvalidUrls[originalIndex])
          updatedInvalidUrls[originalIndex] = {};
        updatedInvalidUrls[originalIndex][field] = true;
      } else {
        if (updatedInvalidUrls[originalIndex]) {
          delete updatedInvalidUrls[originalIndex][field];
          if (Object.keys(updatedInvalidUrls[originalIndex]).length === 0) {
            delete updatedInvalidUrls[originalIndex];
          }
        }
      }
    } else if (field === "linkdin") {
      const isUrlValidLinkedIn = isValidURLFORLinkedIn(value);
      if (!isUrlValidLinkedIn) {
        if (!updatedInvalidUrls[originalIndex])
          updatedInvalidUrls[originalIndex] = {};
        updatedInvalidUrls[originalIndex][field] = true;
      } else {
        if (updatedInvalidUrls[originalIndex]) {
          delete updatedInvalidUrls[originalIndex][field];
          if (Object.keys(updatedInvalidUrls[originalIndex]).length === 0) {
            delete updatedInvalidUrls[originalIndex];
          }
        }
      }
    }

    setInvalidUrls(updatedInvalidUrls);
    setEmptyFields(updatedEmptyFields);
  };

  const filteredLeads = showOnlyInvalid
    ? editableLeads
        .map((lead, index) => ({ lead, originalIndex: index }))
        .filter(({ lead, originalIndex }) => {
          const hasEmptyField = Object.keys(lead).some(
            (key) => !lead[key]?.trim()
          );

          const hasInvalidUrl = !!invalidUrls[originalIndex];
          return hasEmptyField || hasInvalidUrl;
        })
    : editableLeads.map((lead, index) => ({ lead, originalIndex: index }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-500 hover:text-gray-800 "
            onClick={goBackHandler}
          >
            <FaArrowLeftLong />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Sample Data</h1>
          <span className="py-1 px-3 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            In Progress
          </span>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="text-purple-700 border-purple-700"
          >
            Rename Leads List
          </Button>
          <Button variant="destructive">Delete Leads List</Button>
        </div>
      </div>
      <div className="mb-8">
        <Progress value={40} className="h-1 bg-purple-200" />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Step 2/5 - Set Up</span>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent>
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
                    <th className="text-left p-2 border  border-slate-100 size-10 ml-3 bg-slate-200">
                      Sr.No
                    </th>
                    {Object.keys(leads[0]).map((key) => (
                      <th
                        key={key}
                        className="text-left p-2 border  border-slate-100 bg-slate-200"
                      >
                        <div className="flex items-center">
                          {key}
                          {emptyFields[key] > 0 && (
                            <span className="ml-2 flex items-center text-red-500 gap-1 text-sm z-50">
                              <ToolTip
                                tooltip={`${emptyFields[key]} leads have empty <br/> in their ${key}`}
                              >
                                <RiInformationOffLine />
                              </ToolTip>
                              <span className="mr-1  gap-1">
                                {emptyFields[key]}
                              </span>
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(({ lead, originalIndex }, index) => (
                    <tr key={originalIndex}>
                      <td className="border border-slate-100 p-2 ml-3 bg-slate-200 ">
                        {index + 1}
                      </td>
                      {Object.entries(lead).map(([key, value]) => (
                        <td key={key} className="border p-0">
                          <div className="relative">
                            <Input
                              value={value || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  originalIndex,
                                  key,
                                  e.target.value
                                )
                              }
                              className={`border-none w-full pr-10 rounded-none outline-transparent ${
                                !value?.trim() ? "bg-red-200" : ""
                              } ${
                                invalidUrls[originalIndex]?.[key]
                                  ? "bg-red-200"
                                  : ""
                              }`}
                            />

                            {!value?.trim() && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-50">
                                <span className="text-black cursor-pointer">
                                  <ToolTip tooltip={`Missing ${key}`}>
                                    <IoInformationCircleOutline />
                                  </ToolTip>
                                </span>
                              </div>
                            )}

                            {invalidUrls[originalIndex]?.[key] && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-50">
                                <span className="text-black cursor-pointer">
                                  <ToolTip
                                    tooltip={`${key} URL is incorrect  `}
                                  >
                                    <IoInformationCircleOutline />
                                  </ToolTip>
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No leads to display.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => {
            console.log("Continue clicked");
            console.log("Edited Leads Data:", editableLeads);
          }}
          className="px-4 py-2 bg-purple-500 text-white text-lg rounded-md"
          disabled={editableLeads.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;

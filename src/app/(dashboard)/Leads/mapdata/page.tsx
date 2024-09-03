"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiInformationOffLine } from "react-icons/ri";

type Lead = {
  [key: string]: string | undefined;
};

const isValidURL = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (e) {
    return false;
  }
};

const SetupPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editableLeads, setEditableLeads] = useState<Lead[]>([]);
  const [emptyFields, setEmptyFields] = useState<{ [key: string]: number }>({});
  //console.log(emptyFields);
  const [invalidUrls, setInvalidUrls] = useState<{
    [index: number]: { [key: string]: boolean };
  }>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data)) as Lead[];
        setLeads(parsedData);
        setEditableLeads(parsedData);
        calculateEmptyFields(parsedData);
        validateUrls(parsedData);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [searchParams]);

  const calculateEmptyFields = (data: Lead[]) => {
    const counts: { [key: string]: number } = {};
    data.forEach((lead) => {
      Object.keys(lead).forEach((key) => {
        if (!lead[key]?.trim()) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });
    //console.log("Calculated empty fields:", counts);
    setEmptyFields(counts);
  };

  const validateUrls = (data: Lead[]) => {
    const urlErrors: { [index: number]: { [key: string]: boolean } } = {};
    data.forEach((lead, index) => {
      const urlErrorsForLead: { [key: string]: boolean } = {};
      if (lead["linkdin"] && !isValidURL(lead["linkdin"])) {
        urlErrorsForLead["linkdin"] = true;
      }
      if (lead["compnay domain"] && !isValidURL(lead["compnay domain"])) {
        urlErrorsForLead["compnay domain"] = true;
      }
      if (Object.keys(urlErrorsForLead).length > 0) {
        urlErrors[index] = urlErrorsForLead;
      }
    });
    //console.log("Validation errors:", urlErrors);
    setInvalidUrls(urlErrors);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedLeads = [...editableLeads];
    const prevValue = updatedLeads[index][field];
    updatedLeads[index] = { ...updatedLeads[index], [field]: value };
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

    if (field === "linkdin" || field === "compnay domain") {
      const isUrlValid = isValidURL(value);
      const updatedInvalidUrls = { ...invalidUrls };
      if (!isUrlValid) {
        if (!updatedInvalidUrls[index]) updatedInvalidUrls[index] = {};
        updatedInvalidUrls[index][field] = true;
      } else {
        if (updatedInvalidUrls[index]) {
          delete updatedInvalidUrls[index][field];
          if (Object.keys(updatedInvalidUrls[index]).length === 0) {
            delete updatedInvalidUrls[index];
          }
        }
      }
      setInvalidUrls(updatedInvalidUrls);
    }

    //console.log("Updated empty fields:", updatedEmptyFields);
    setEmptyFields(updatedEmptyFields);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-800">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
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
          <div className="mb-8">
            <h2 className="text-xl font-bold">
              Set up imported custom variables
            </h2>
            <p>
              Select how columns from your file map to contact columns needed
              for enrichment.
            </p>
          </div>

          <div className="space-y-6">
            {leads.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">SR</th>
                    {Object.keys(leads[0]).map((key) => (
                      <th key={key} className="text-left p-2">
                        <div className="flex items-center ">
                          <span>{key}</span>
                          {emptyFields[key] > 0 && (
                            <span className="ml-2 flex items-center text-red-500 gap-1 text-sm">
                              <RiInformationOffLine className="" />
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
                  {editableLeads.map((lead, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 border">{index + 1}</td>
                      {Object.keys(lead).map((key) => (
                        <td key={key} className="p-2 border">
                          <div className="relative">
                            <Input
                              value={lead[key] || ""}
                              onChange={(e) =>
                                handleInputChange(index, key, e.target.value)
                              }
                              className={`border-none ${
                                !lead[key]?.trim() ? "bg-red-200" : ""
                              }`}
                            />
                            {(!lead[key]?.trim() ||
                              (invalidUrls[index] &&
                                invalidUrls[index][key])) && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <span
                                  className="text-red-500"
                                  title={
                                    !lead[key]?.trim()
                                      ? "This field is required."
                                      : "Invalid URL format."
                                  }
                                >
                                  <IoInformationCircleOutline />
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
              <p>No leads data available.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => console.log("Continue clicked")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={editableLeads.length === 0}
        >
          Verify Email - and ingnore leads with error
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;

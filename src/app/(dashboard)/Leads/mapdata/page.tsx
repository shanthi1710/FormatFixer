"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Lead = {
  firstName?: string;
  lastName?: string;
  linkedin?: string;
  companyDomain?: string;
  companyName?: string;
  jobTitle?: string;
  [key: string]: string | undefined;
};

const SetupPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editableLeads, setEditableLeads] = useState<Lead[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data)) as Lead[];
        setLeads(parsedData);
        setEditableLeads(parsedData);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [searchParams]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedLeads = [...editableLeads];
    updatedLeads[index] = { ...updatedLeads[index], [field]: value };
    setEditableLeads(updatedLeads);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
          <h1 className="text-2xl font-semibold text-gray-800">sample-data</h1>
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
                    {Object.keys(leads[0]).map((key) => (
                      <th key={key} className="text-left p-2">
                        {key}
                      </th>
                    ))}
                    <th className="text-left p-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={index} className="border-b">
                      {Object.keys(lead).map((key) => (
                        <td key={key} className="p-2 border">
                          {lead[key]}
                        </td>
                      ))}
                      <td className="p-2 border">
                        <Input
                          value={
                            editableLeads[index]?.[
                              Object.keys(lead)[0] as string
                            ] || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              Object.keys(lead)[0],
                              e.target.value
                            )
                          }
                        />
                      </td>
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
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;

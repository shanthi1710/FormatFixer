"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import leadsData from "../../../../data.json";

export default function LeadLists() {
  const [leads, setLeads] = useState(leadsData);

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lead Lists</h1>

      <div className="mb-6">
        <Card className="border rounded-lg shadow-sm">
          <CardContent className="flex space-x-4 py-4 bg-white shadow-md">
            <Button
              variant="ghost"
              className="text-gray-800 hover:bg-gray-200 underline"
            >
              All Leads List
            </Button>
            <Button variant="ghost" className="text-gray-800 hover:bg-gray-200">
              From CSV Files
            </Button>
            <Button variant="ghost" className="text-gray-800 hover:bg-gray-200">
              From Hubspot
            </Button>
            <Button variant="ghost" className="text-gray-800 hover:bg-gray-200">
              From LinkedIn Sales Navigator
            </Button>
            <Button className="text-white hover:bg-purple-500 bg-purple-600 rounded-lg">
              Create New List
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border rounded-lg shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    Export Type
                  </th>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    No. of Leads
                  </th>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    Created On
                  </th>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    Status
                  </th>
                  <th className="py-3 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-gray-800">
                      <Link
                        href={`/Leads/${encodeURIComponent(lead.name)}`}
                        className="block text-blue-500 hover:text-blue-700"
                      >
                        {lead.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {lead.exportType}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {lead.leadsCount}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {lead.createdOn}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-medium ${
                          lead.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-200">
            Previous
          </Button>
          <span className="text-sm text-gray-600">1 / 3</span>
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-200">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

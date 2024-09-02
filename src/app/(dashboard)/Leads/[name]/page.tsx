"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Papa from "papaparse";

const acceptableCSVFileTypes = ".csv";

const UploadLeadList: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const router = useRouter();

  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
        //console.log(result.data);
      },
    });
  };

  const onContinueHandler = () => {
    const queryParams = new URLSearchParams({
      data: JSON.stringify(csvData),
    }).toString();
    router.push(`/Leads/mapdata?${queryParams}`);
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
          <h1 className="text-2xl font-semibold text-gray-800">Untitled</h1>
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
        <Progress value={20} className="h-1 bg-purple-200" />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Step 1/5 - Upload</span>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="text-center py-16">
          <UploadCloud className="w-12 h-12 purpule-blue-600 mx-auto mb-4" />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <p className="text-lg font-semibold text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              Only .csv files are accepted - Maximum 10,000 leads
            </p>
            <input
              type="file"
              accept={acceptableCSVFileTypes}
              className="hidden"
              id="file-upload"
              onChange={onFileChangeHandler}
            />
          </label>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onContinueHandler}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={csvData.length === 0}
        >
          Continue
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Fields Formatting
          </h2>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <span className="font-semibold">Company name</span>
            </p>
            <p className="mb-4">
              <span className="text-green-500">✔</span> google
            </p>
            <p className="mb-2">
              <span className="font-semibold">Company domain</span>
            </p>
            <p className="mb-4">
              <span className="text-green-500">✔</span> google.com <br />
              <span className="text-green-500">✔</span> https://www.google.com
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              LinkedIn Profile URL
            </h2>
            <Link href="#" className="text-blue-600 text-sm">
              Download/View sample
            </Link>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <span className="font-semibold">Allowed:</span> Regular LinkedIn
              URL
            </p>
            <p className="mb-4">
              <span className="text-green-500">✔</span>{" "}
              https://linkedin.com/in/marcbenioff <br />
              <span className="text-green-500">✔</span> https://www.google.com
            </p>
            <p className="mb-2">
              <span className="font-semibold">Not Allowed:</span> Sales
              Navigator URL
            </p>
            <p>
              <span className="text-red-500">✘</span>{" "}
              https://linkedin.com/in/marcbenioff <br />
              <span className="text-red-500">✘</span>{" "}
              https://linkedin.com/sales/people/ACoAAAAAPwEB4dd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLeadList;

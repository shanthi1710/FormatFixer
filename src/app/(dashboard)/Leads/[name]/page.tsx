"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCsvData } from "@/lib/store/csvDataSlice";
import Link from "next/link";
import Papa from "papaparse";
import { RootState } from "@/lib/store/store";

const acceptableCSVFileTypes = ".csv";

const UploadLeadList: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const csvData = useSelector((state: RootState) => state.csvData.data);

  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data;
        if (Array.isArray(parsedData)) {
          dispatch(setCsvData(parsedData));
        } else {
          dispatch(setCsvData([]));
        }
      },
      error: (error) => {
        console.error("CSV parsing error: ", error);
        dispatch(setCsvData([]));
      },
    });
  };

  const onContinueHandler = () => {
    router.push(`/Leads/mapdata`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-800">
            <FaArrowLeftLong />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Upload</h1>
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
          className="mt-4 px-4 py-2 bg-purple-500 text-black rounded-md text-lg"
          disabled={csvData.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UploadLeadList;

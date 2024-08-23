"use client";

import React, { ChangeEvent } from "react";
import Papa from "papaparse";

const acceptableCSVFileTypes = ".csv";

const LeadsUploadPage: React.FC = () => {
  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log(result.data);
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Upload lead list</h1>
        <p className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur. Amet suscipit vulputate
          tristique sagittis. Facilisis id ut morbi aliquet duis sed.
        </p>
      </div>

      <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 bg-blue-50 flex flex-col items-center justify-center">
        <input
          type="file"
          accept={acceptableCSVFileTypes}
          className="hidden"
          id="file-upload"
          onChange={onFileChangeHandler}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="text-blue-500 text-xl font-semibold">
            Click to upload
          </div>
          <div className="text-gray-400 mt-2">or drag and drop</div>
          <div className="text-sm text-gray-400 mt-2">
            only .csv files are accepted - Maximum 10,000 leads
          </div>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Fields Formatting
          </h2>
          <p className="mt-2 text-gray-500">Company name</p>
          <p className="mt-1 text-gray-400">✓ google</p>
          <p className="mt-1 text-gray-400">✗ ----------- or -----------</p>
          <p className="mt-4 text-gray-500">Company domain</p>
          <p className="mt-1 text-gray-400">✓ google.com</p>
          <p className="mt-1 text-gray-400">✓ https://www.google.com</p>
        </div>
        <div>
          <p className="mt-6 text-gray-500">LinkedIn Profile URL</p>
          <p className="mt-1 text-gray-400">Allowed: Regular LinkedIn URL</p>
          <p className="mt-1 text-gray-400">
            ✓ https://linkedin.com/in/marcbenioff
          </p>
          <p className="mt-1 text-gray-400">✓ https://www.google.com</p>
          <p className="mt-4 text-gray-400">Not Allowed: Sales Navigator URL</p>
          <p className="mt-1 text-gray-400">
            ✗ https://linkedin.com/in/marcbenioff
          </p>
          <p className="mt-1 text-gray-400">
            ✗ https://linkedin.com/sales/people/ACoAAAAAPwEB4dd
          </p>
        </div>
      </div>

      <div className="mt-8 text-blue-500 text-sm font-semibold">
        <a href="#" className="underline">
          Download/View sample
        </a>
      </div>
    </div>
  );
};

export default LeadsUploadPage;

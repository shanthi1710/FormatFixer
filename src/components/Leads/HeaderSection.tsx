import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeaderSection: React.FC = () => {
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/Leads");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-500 hover:text-gray-800"
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
        <Button variant="outline" className="text-purple-700 border-purple-700">
          Rename Leads List
        </Button>
        <Button variant="destructive">Delete Leads List</Button>
      </div>
    </div>
  );
};

export default HeaderSection;

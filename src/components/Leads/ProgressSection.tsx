import React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressSection: React.FC = () => {
  return (
    <div className="mb-8">
      <Progress value={40} className="h-1 bg-purple-200" />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Step 2/5 - Set Up</span>
      </div>
    </div>
  );
};

export default ProgressSection;

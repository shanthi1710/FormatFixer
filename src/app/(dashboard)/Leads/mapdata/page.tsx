"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store/store";
import HeaderSection from "@/components/Leads/HeaderSection";
import ProgressSection from "@/components/Leads/ProgressSection";
import EditTable from "@/components/Leads/EditTable";
import { Lead } from "@/components/Leads/types";

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

const SetupPage: React.FC = () => {
  const leads = useSelector((state: RootState) => state.csvData.data);

  const router = useRouter();
  const [editableLeads, setEditableLeads] = useState<Lead[]>([]);
  const [emptyFields, setEmptyFields] = useState<{ [key: string]: number }>({});
  const [invalidUrls, setInvalidUrls] = useState<{
    [index: number]: { [key: string]: boolean };
  }>({});

  const [showOnlyInvalid, setShowOnlyInvalid] = useState(false);
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
        updatedInvalidUrls[originalIndex] = {
          ...updatedInvalidUrls[originalIndex],
          [field]: true,
        };
      } else if (updatedInvalidUrls[originalIndex]) {
        delete updatedInvalidUrls[originalIndex][field];
        if (Object.keys(updatedInvalidUrls[originalIndex]).length === 0) {
          delete updatedInvalidUrls[originalIndex];
        }
      }
    } else if (field === "linkdin") {
      const isUrlValidLinkedIn = isValidURLFORLinkedIn(value);
      if (!isUrlValidLinkedIn) {
        updatedInvalidUrls[originalIndex] = {
          ...updatedInvalidUrls[originalIndex],
          [field]: true,
        };
      } else if (updatedInvalidUrls[originalIndex]) {
        delete updatedInvalidUrls[originalIndex][field];
        if (Object.keys(updatedInvalidUrls[originalIndex]).length === 0) {
          delete updatedInvalidUrls[originalIndex];
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
      <HeaderSection />
      <ProgressSection />
      <EditTable
        leads={leads}
        filteredLeads={filteredLeads}
        emptyFields={emptyFields}
        invalidUrls={invalidUrls}
        showOnlyInvalid={showOnlyInvalid}
        setShowOnlyInvalid={setShowOnlyInvalid}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default SetupPage;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import templates from "../../../public/templates/classic.json";
import Image from "next/image";

const SelectTemplatePage = () => {
  const router = useRouter();

  const handleTemplateSelect = (templateId) => {
    console.log("Template ID selected:", templateId);
    const selectedTemplate = templates[templateId];

    if (selectedTemplate) {
      console.log("Selected template:", selectedTemplate);
      localStorage.setItem(
        "selectedTemplate",
        JSON.stringify(selectedTemplate),
      );
      router.push(`/resume-creation`);
    } else {
      console.error("Template not found:", templateId);
    }
  };

  return (
    <div className="grid-cols grid gap-4 py-16 text-center">
      <h1 className="col-span-5">Select a Template</h1>
      <div className="py-2">
        <button
          className="border-bg-color-dark bg-slate-700 hover:border-x-green-500"
          onClick={() => handleTemplateSelect("classicFrame1")}
        >
          <Image
            src="/images/resumeImg/resume1.png"
            alt="Calssic frame"
            width={300}
            height={300}
          />
        </button>
      </div>
      <div className="py-2">
        <button
          className="border-bg-color-dark bg-slate-700 hover:border-x-green-500"
          onClick={() => handleTemplateSelect("classicFrame2")}
        >
          <Image
            src="/images/resumeImg/resumeframe.webp"
            alt="Calssic frame"
            width={300}
            height={300}
          />
        </button>
      </div>
      <div className="py-2">
        <button
          className="border-bg-color-dark bg-slate-700 hover:border-x-green-500"
          onClick={() => handleTemplateSelect("modernFrame1")}
        >
          <Image
            src="/images/resumeImg/resumeframe3.jpg"
            alt="Modern frame"
            width={300}
            height={250}
          />
        </button>
      </div>
    </div>
  );
};

export default SelectTemplatePage;

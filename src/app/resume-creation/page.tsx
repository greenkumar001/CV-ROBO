"use client";
import React, { useEffect, useState } from "react";
import Handlebars from "handlebars";
import axiosInstance1 from "@/server/server1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeCreationPage = () => {
  const [resumeData, setResumeData] = useState<any>({});
  const [template, setTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplateAndData = async () => {
      setLoading(true);
      try {
        const storedTemplate = localStorage.getItem("selectedTemplate");
        if (storedTemplate) {
          const parsedTemplate = JSON.parse(storedTemplate);
          setTemplate(parsedTemplate.html);
        }

        const resumeId = localStorage.getItem("resumeId");
        if (resumeId) {
          const response = await axiosInstance1.get(
            `/resume/id?resumeId=${resumeId}`,
          );
          const skillsString = response.data.skills
            .map((skill) => skill.skillName)
            .join(", ");
          const hobbiesString = response.data.hobbies.join(", ") + ".";

          const experiences = response.data.experience.map((exp) => ({
            ...exp,
            responsibilitiesString: exp.responsibilities,
          }));

          setResumeData({
            ...response.data,
            skillsString,
            hobbiesString,
            experience: experiences,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateAndData();
  }, []);

  const renderTemplate = (templateSource: string, data: any) => {
    if (!templateSource) return "";
    const template = Handlebars.compile(templateSource);
    return template(data);
  };

  const downloadResume = async () => {
    const input = document.getElementById("resume-container");

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("CVresume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return <div>No template selected</div>;
  }

  const filledTemplate = renderTemplate(template, resumeData);

  return (
    <div className="py-24">
      <h1 className="mb-6 text-center text-3xl font-bold">Your Resume</h1>
      <div
        id="resume-container"
        className="resume-container rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
        dangerouslySetInnerHTML={{ __html: filledTemplate }}
      />
      <div className="mt-6 text-center">
        <button
          onClick={downloadResume}
          className="inline-block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Download Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeCreationPage;

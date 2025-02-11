"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import axiosInstance1 from "@/server/server1";
import { FaPlus, FaRobot, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/button.css";
import Image from "next/image";
const ManualCreateResumePage: React.FC = () => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    resumeId: "",
    userId: "",
    name: "",
    mobile: "",
    email: "",
    location: "",
    summary: "",
    skills: [{ skillName: "" }],
    projects: [
      { projectTitle: "", projectDescription: "", startDate: "", endDate: "" },
    ],
    experience: [
      {
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        description: "",
      },
    ],
    educations: [{ degree: "", college: "", startDate: "", endDate: "" }],
    certifications: [{ certificationName: "", startDate: "", endDate: "" }],
    hobbies: [""],
  });

  const router = useRouter();
  const [aiSummaries, setAiSummaries] = useState([]);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      const parsedData = JSON.parse(data);
      setFormData((prevState) => ({
        ...prevState,
        ...parsedData,
      }));
    } else {
      const fetchProfileData = async () => {
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          if (token && userId) {
            const response = await axios.get(`/user/id/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setFormData((prevState) => ({
              ...prevState,
              name: response.data.firstName + " " + response.data.lastName,
              mobile: response.data.mobile,
              email: response.data.email,
            }));
          }
        } catch (error) {
          console.error("Error fetching profile data", error);
        }
      };

      fetchProfileData();
    }
  }, [searchParams]);

  const handleInputChange = (e, section, index, field) => {
    const { value } = e.target;
    setFormData((prevState) => {
      if (section === "hobbies" || section === "skills") {
        const updatedItems = [...prevState[section]];
        updatedItems[index][field] = value;
        return {
          ...prevState,
          [section]: updatedItems,
        };
      } else {
        const updatedSection = prevState[section].map((item, i) => {
          if (i === index) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return {
          ...prevState,
          [section]: updatedSection,
        };
      }
    });
  };

  const handleSingleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const addField = (section) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: [
        ...prevState[section],
        section === "experience"
          ? {
              jobTitle: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              responsibilities: [""],
            }
          : section === "projects"
            ? { title: "", description: "" }
            : section === "educations"
              ? {
                  degree: "",
                  field: "",
                  institution: "",
                  startDate: "",
                  endDate: "",
                }
              : section === "certifications"
                ? { title: "", institution: "", date: "" }
                : section === "skills"
                  ? { skillName: "" }
                  : { value: "" },
      ],
    }));
  };

  const removeField = (section, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: prevState[section].filter((_, i) => i !== index),
    }));
  };
  const generateAISummaries = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance1.post(
        "/ai/groq/generate/summary",
        { prompt: formData.summary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Extract summaries from response
      const summaries = response.data; // Assuming response.data is an array

      // Check if summaries is an array and has items
      if (Array.isArray(summaries) && summaries.length > 0) {
        setAiSummaries(summaries);
      } else {
        setAiSummaries(["Unexpected data format received."]);
      }
    } catch (error) {
      console.error(
        "Error generating AI summaries:",
        error.response ? error.response.data : error.message,
      );
      setAiSummaries(["Failed to generate summaries. Please try again."]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile, email, location } = formData;
    if (!name || !mobile || !email || !location) {
      alert("Please fill in all required fields.");
      return;
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      alert("You must be logged in to save your resume.");
      return;
    }

    const updatedFormData = {
      ...formData,
      userId: userId,
    };

    try {
      const response = await axiosInstance1.post(
        "/resume/save",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { resumeId } = response.data; // Extract resumeId from the response
      // Save the resumeId to local storage or state for later use
      localStorage.setItem("resumeId", resumeId);
      console.log("Response Data:", response.data);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      router.push("/select-template");
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
      }
    }
  };

  const renderSection = () => {
    const cardStyle = "mb-4 rounded-lg border bg-white-300 p-4 shadow-lg";
    const labelStyle = "block text-sm font-semibold text-black";
    const inputStyle =
      "mt-1 block w-full rounded border border-white-600 bg-gray-100 px-3 py-2 text focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50";

    switch (activeSection) {
      case "profile":
        return (
          <div>
            <div className={cardStyle}>
              <div className="mb-4">
                <label htmlFor="name" className={labelStyle}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleSingleInputChange}
                  className={inputStyle}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className={labelStyle}>
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleSingleInputChange}
                  className={inputStyle}
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className={labelStyle}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleSingleInputChange}
                  className={inputStyle}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className={labelStyle}>
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location || ""}
                  onChange={handleSingleInputChange}
                  className={inputStyle}
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>
        );
      case "summary":
        return (
          <div className={cardStyle}>
            <div className="relative mb-4">
              <label htmlFor="summary" className={labelStyle}>
                Summary
              </label>

              <textarea
                id="summary"
                value={formData.summary}
                onChange={handleSingleInputChange}
                className={`${inputStyle} pr-10`}
                placeholder="Enter your summary"
              />
              <button
                type="button"
                className="ai-generate-button absolute bottom-2 right-2 text-pretty text-lg font-bold  text-blue-700"
                onClick={generateAISummaries}
              >
                <Image
                  src="/images/logo/generate.png"
                  alt="Generate"
                  width={100}
                  height={100}
                  className="hero-slide-out"
                />
              </button>
            </div>

            {aiSummaries.length > 0 && (
              <div className="ai-summary-box">
                <h3>AI-Generated Summaries</h3>
                {aiSummaries.map((summary, index) => (
                  <div
                    key={index}
                    className="ai-summary-option"
                    onClick={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        summary,
                      }))
                    }
                    style={{
                      cursor: "pointer",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    {summary}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "experience":
        return (
          <div>
            {formData.experience.map((exp, index) => (
              <div key={index} className={cardStyle}>
                <h2 className="text-lg font-semibold text-black">
                  Experience {index + 1}
                </h2>
                <div className="mb-2">
                  <label htmlFor={`jobTitle-${index}`} className={labelStyle}>
                    Job Title
                  </label>
                  <input
                    id={`jobTitle-${index}`}
                    type="text"
                    value={exp.jobTitle || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "jobTitle")
                    }
                    className={inputStyle}
                    placeholder="Enter job title"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`company-${index}`} className={labelStyle}>
                    Company
                  </label>
                  <input
                    id={`company-${index}`}
                    type="text"
                    value={exp.companyName || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "company")
                    }
                    className={inputStyle}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`location-${index}`} className={labelStyle}>
                    Location
                  </label>
                  <input
                    id={`location-${index}`}
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "location")
                    }
                    className={inputStyle}
                    placeholder="Enter location"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`startDate-${index}`} className={labelStyle}>
                    Start Date
                  </label>
                  <input
                    id={`startDate-${index}`}
                    type="date"
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "startDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`endDate-${index}`} className={labelStyle}>
                    End Date
                  </label>
                  <input
                    id={`endDate-${index}`}
                    type="date"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "endDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`description-${index}`}
                    className={labelStyle}
                  >
                    Description
                  </label>
                  <input
                    id={`description-${index}`}
                    type="text"
                    value={exp.description || ""}
                    onChange={(e) =>
                      handleInputChange(e, "experience", index, "description")
                    }
                    className={inputStyle}
                    placeholder="description"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`responsibilities-${index}`}
                    className={labelStyle}
                  >
                    Responsibilities
                  </label>

                  <div className="mb-2 flex items-center">
                    <input
                      id={`responsiblities-${index}`}
                      type="text"
                      value={exp.responsibilities || ""}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "experience",
                          index,
                          "responsibilities",
                        )
                      }
                      className={inputStyle}
                      placeholder="Enter responsibility"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => removeField("experience", index)}
                    className="mt-2 p-1 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("experience")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      case "education":
        return (
          <div>
            {formData.educations.map((edu, index) => (
              <div key={index} className={cardStyle}>
                <h2 className="text-lg font-semibold text-black">
                  Education {index + 1}
                </h2>
                <div className="mb-2">
                  <label htmlFor={`degree-${index}`} className={labelStyle}>
                    Degree
                  </label>
                  <input
                    id={`degree-${index}`}
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      handleInputChange(e, "educations", index, "degree")
                    }
                    className={inputStyle}
                    placeholder="Enter degree"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`field-${index}`} className={labelStyle}>
                    Field of study
                  </label>
                  <input
                    id={`field-${index}`}
                    type="text"
                    value={""}
                    onChange={(e) =>
                      handleInputChange(e, "educations", index, "field")
                    }
                    className={inputStyle}
                    placeholder="Enter field of study"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`institute-${index}`} className={labelStyle}>
                    Institute
                  </label>
                  <input
                    id={`institute-${index}`}
                    type="text"
                    value={edu.college || ""}
                    onChange={(e) =>
                      handleInputChange(e, "educations", index, "college")
                    }
                    className={inputStyle}
                    placeholder="Enter the college of name"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor={`startDate-${index}`} className={labelStyle}>
                    Start Date
                  </label>
                  <input
                    id={`startDate-${index}`}
                    type="date"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "educations", index, "startDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`endDate-${index}`} className={labelStyle}>
                    End Date
                  </label>
                  <input
                    id={`endDate-${index}`}
                    type="date"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "educations", index, "endDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => removeField("educations", index)}
                    className="shake mt-2 transform p-1 text-red-500 transition-transform duration-200 ease-in-out hover:scale-110 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("educations")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      case "skills":
        return (
          <div>
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className={cardStyle}
                // className="mb-4 rounded border border-gray-300 p-4"
              >
                <label>
                  Skill Name:
                  <input
                    type="text"
                    value={skill.skillName || ""}
                    onChange={(e) =>
                      handleInputChange(e, "skills", index, "skillName")
                    }
                    className={inputStyle}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeField("skills", index)}
                  className="mt-2 p-1 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("skills")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      case "projects":
        return (
          <div>
            {formData.projects.map((project, index) => (
              <div key={index} className={cardStyle}>
                <h2 className="text-lg font-semibold text-black">
                  Project {index + 1}
                </h2>
                <div className="mb-2">
                  <label
                    htmlFor={`projectTitle-${index}`}
                    className={labelStyle}
                  >
                    Project Title
                  </label>
                  <input
                    id={`projectTitle-${index}`}
                    type="text"
                    value={project.projectTitle || ""}
                    onChange={(e) =>
                      handleInputChange(e, "projects", index, "projectTitle")
                    }
                    className={inputStyle}
                    placeholder="Enter project title"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`projectDescription-${index}`}
                    className={labelStyle}
                  >
                    Description
                  </label>
                  <textarea
                    id={`projectDescription-${index}`}
                    value={project.projectDescription || ""}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "projects",
                        index,
                        "projectDescription",
                      )
                    }
                    className={inputStyle}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`startDate-${index}`} className={labelStyle}>
                    Start Date
                  </label>
                  <input
                    id={`startDate-${index}`}
                    type="date"
                    value={project.startDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "projects", index, "startDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`endDate-${index}`} className={labelStyle}>
                    End Date
                  </label>
                  <input
                    id={`endDate-${index}`}
                    type="date"
                    value={project.endDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "projects", index, "endDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => removeField("projects", index)}
                    className="mt-2 p-1 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("projects")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      case "certifications":
        return (
          <div>
            {formData.certifications.map((cert, index) => (
              <div key={index} className={cardStyle}>
                <h2 className="text-lg font-semibold text-black">
                  Certification {index + 1}
                </h2>
                <div className="mb-2">
                  <label
                    htmlFor={`certificationName-${index}`}
                    className={labelStyle}
                  >
                    Certification Name
                  </label>
                  <input
                    id={`certificationName-${index}`}
                    type="text"
                    value={cert.certificationName || ""}
                    onChange={(e) =>
                      handleInputChange(e, "certifications", index, "name")
                    }
                    className={inputStyle}
                    placeholder="Enter certification name"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`certificationDate-${index}`}
                    className={labelStyle}
                  >
                    startDate
                  </label>
                  <input
                    id={`certificationDate-${index}`}
                    type="date"
                    value={cert.startDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "certifications", index, "startDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`certificationDate-${index}`}
                    className={labelStyle}
                  >
                    endDate
                  </label>
                  <input
                    id={`certificationDate-${index}`}
                    type="date"
                    value={cert.endDate || ""}
                    onChange={(e) =>
                      handleInputChange(e, "certifications", index, "endDate")
                    }
                    className={inputStyle}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => removeField("certifications", index)}
                    className="mt-2 p-1 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("certifications")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      case "hobbies":
        return (
          <div>
            {formData.hobbies.map((hobby, index) => (
              <div key={index} className={cardStyle}>
                <h2 className="text-lg font-semibold text-black">
                  Hobby {index + 1}
                </h2>
                <div className="mb-2">
                  <label htmlFor={`hobby-${index}`} className={labelStyle}>
                    Hobby
                  </label>
                  <input
                    id={`hobby-${index}`}
                    type="text"
                    value={hobby || ""}
                    onChange={(e) =>
                      handleInputChange(e, "hobbies", index, "field")
                    }
                    className={inputStyle}
                    placeholder="Enter hobby"
                  />
                  <button
                    type="button"
                    onClick={() => removeField("hobbies", index)}
                    className="mt-2 p-1 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("hobbies")}
              className="p-2 text-blue-500"
            >
              <FaPlus />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="container mx-auto flex items-start py-24 shadow-lg"
      style={{
        backgroundImage: `url("/images/generate/wave-background.png ")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-1/4 p-4 shadow-lg">
        <nav className="flex flex-col space-y-2 shadow-lg">
          {[
            "profile",
            "summary",
            "experience",
            "education",
            "skills",
            "projects",
            "certifications",
            "hobbies",
          ].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`m-2 transform rounded px-4 py-2 shadow-lg transition-transform hover:translate-x-1 ${
                activeSection === section
                  ? "bg-slate-400 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <div className="w-3/4">
        <h1 className="text-2xl font-bold text-black">
          Create Resume Manually
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          {renderSection()}
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative mt-4 rounded-lg border-2 border-blue-500 bg-transparent px-6 py-3 font-bold text-blue-500 transition-all duration-300"
            >
              Save Resume
              <span className="absolute inset-0 origin-left scale-x-0 transform border-2 border-blue-500 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualCreateResumePage;

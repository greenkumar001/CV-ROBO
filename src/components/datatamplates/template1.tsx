// components/Templates/Template1.jsx

import React from "react";

const Template1 = ({ formData }) => {
  if (!formData) return null;

  const {
    name,
    mobile,
    email,
    location,
    summary,
    skills,
    projects,
    experience,
    educations,
    certifications,
    hobbies,
  } = formData;

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <header className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">{name}</h1>
        <p className="text-lg text-gray-700">{email}</p>
        <p className="text-lg text-gray-700">{mobile}</p>
        <p className="text-lg text-gray-700">{location}</p>
      </header>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Summary</h2>
        <p className="text-gray-800">{summary}</p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Skills</h2>
        <ul className="list-disc space-y-2 pl-5">
          {skills &&
            skills.map((skill, index) => (
              <li key={index} className="text-gray-700">
                {skill.skillName}
              </li>
            ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Projects</h2>
        <ul className="space-y-4">
          {projects &&
            projects.map((project, index) => (
              <li key={index} className="rounded-lg border border-gray-300 p-4">
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
              </li>
            ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Experience</h2>
        <ul className="space-y-4">
          {experience &&
            experience.map((exp, index) => (
              <li key={index} className="rounded-lg border border-gray-300 p-4">
                <h3 className="text-xl font-medium">
                  {exp.jobTitle} at {exp.company}
                </h3>
                <p className="text-gray-700">{exp.location}</p>
                <p className="text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-800">{exp.description}</p>
                <ul className="mt-2 list-disc pl-5">
                  {exp.responsibilities &&
                    exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-gray-700">
                        {resp}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Education</h2>
        <ul className="space-y-4">
          {educations &&
            educations.map((edu, index) => (
              <li key={index} className="rounded-lg border border-gray-300 p-4">
                <h3 className="text-xl font-medium">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </li>
            ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Certifications</h2>
        <ul className="space-y-4">
          {certifications &&
            certifications.map((cert, index) => (
              <li key={index} className="rounded-lg border border-gray-300 p-4">
                <h3 className="text-xl font-medium">{cert.title}</h3>
                <p className="text-gray-700">{cert.institution}</p>
                <p className="text-gray-600">{cert.date}</p>
              </li>
            ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Hobbies</h2>
        <ul className="list-disc space-y-2 pl-5">
          {hobbies &&
            hobbies.map((hobby, index) => (
              <li key={index} className="text-gray-700">
                {hobby}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Template1;

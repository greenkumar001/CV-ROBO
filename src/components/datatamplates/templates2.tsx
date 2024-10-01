// components/Templates/Template2.jsx
import React from "react";

const Template2 = ({ formData }) => {
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
    <div className="mx-auto max-w-3xl p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">{name}</h1>
        <p className="text-lg">Email: {email}</p>
        <p className="text-lg">Mobile: {mobile}</p>
        <p className="text-lg">Location: {location}</p>
      </header>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
        <p className="text-lg">{summary}</p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {skills &&
            skills.map((skill, index) => (
              <div key={index} className="rounded bg-gray-200 p-2">
                {skill.skillName}
              </div>
            ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
        <div className="space-y-4">
          {projects &&
            projects.map((project, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-sm">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Experience</h2>
        <div className="space-y-4">
          {experience &&
            experience.map((exp, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-sm">
                <h3 className="text-xl font-bold">
                  {exp.jobTitle} at {exp.company}
                </h3>
                <p>{exp.location}</p>
                <p>
                  {exp.startDate} - {exp.endDate}
                </p>
                <p>{exp.description}</p>
                <ul className="list-disc pl-5">
                  {exp.responsibilities &&
                    exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Education</h2>
        <div className="space-y-4">
          {educations &&
            educations.map((edu, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-sm">
                <h3 className="text-xl font-bold">
                  {edu.degree} in {edu.field}
                </h3>
                <p>{edu.institution}</p>
                <p>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Certifications</h2>
        <div className="space-y-4">
          {certifications &&
            certifications.map((cert, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-sm">
                <h3 className="text-xl font-bold">{cert.title}</h3>
                <p>{cert.institution}</p>
                <p>{cert.date}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Hobbies</h2>
        <div className="flex flex-wrap gap-4">
          {hobbies &&
            hobbies.map((hobby, index) => (
              <div key={index} className="rounded bg-gray-200 p-2">
                {hobby}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Template2;

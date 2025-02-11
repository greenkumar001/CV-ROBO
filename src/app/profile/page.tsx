"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/server/server";
// import "../../styles/index.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("personalInfo"); // Tracks the selected section

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token) {
        try {
          const response = await axiosInstance.get(`user/id/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data</p>;

  // Components to render based on the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case "personalInfo":
        return (
          <div>
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p className="text-gray-700">
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p className="text-gray-700">
                <strong>Mobile:</strong> {userData.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 mt-6 rounded px-4 py-2 text-black">
              Edit Profile
            </button>
          </div>
        );
      case "previousResume":
        return (
          <div>
            <h2 className="text-2xl font-semibold">Previous Resume Data</h2>
            {/* Render previous resume data here */}
            {/* Example: */}
            <p className="mt-4 text-gray-700">
              No previous resume data available.
            </p>
          </div>
        );
      case "favTemplate":
        return (
          <div>
            <h2 className="text-2xl font-semibold">Favorite Resume Template</h2>
            {/* Render favorite resume template here */}
            <p className="mt-4 text-gray-700">
              No favorite templates selected.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto h-full p-28">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4">
          <ul className="space-y-4">
            <li
              onClick={() => setSelectedSection("personalInfo")}
              className={`cursor-pointer p-2 ${
                selectedSection === "personalInfo"
                  ? "bg-yellow-500"
                  : "bg-white"
              }`}
            >
              Personal Information
            </li>
            <li
              onClick={() => setSelectedSection("previousResume")}
              className={`cursor-pointer p-2 ${
                selectedSection === "previousResume"
                  ? "bg-yellow-500"
                  : "bg-white"
              }`}
            >
              Previous Resume Data
            </li>
            <li
              onClick={() => setSelectedSection("favTemplate")}
              className={`cursor-pointer p-2 ${
                selectedSection === "favTemplate" ? "bg-yellow-500" : "bg-white"
              }`}
            >
              Favorite Resume Template
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div className="w-3/4 p-6">
          {renderSection()} {/* Renders the content of the selected section */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

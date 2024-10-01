"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/server/server";
import "../../styles/index.css";

const ProfilePage = () => {
  const [userId, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setUser(response.data);
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
  if (!userId) return <p>No user data</p>;

  return (
    <div className="container mx-auto h-full p-24">
      <h1 className="mb-6 text-center text-3xl font-semibold glass">Profile</h1>
      <div className="glassmorphism ml-64 h-full w-1/2 rounded-lg p-6 shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full md:mx-0"
            />
          </div>
          <div className="mt-6 md:mt-0 md:w-2/3 md:pl-6">
            <h2 className="text-2xl font-semibold ">Personal Information</h2>
            <div className="mt-4">
              <p className="text-xl text-gray-700">
                <strong>First Name:</strong> {userId.firstName}
              </p>
              <p className="text-gray-700">
                <strong>Last Name:</strong> {userId.lastName}
              </p>
              <p className="text-gray-700">
                <strong>Mobile:</strong> {userId.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {userId.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

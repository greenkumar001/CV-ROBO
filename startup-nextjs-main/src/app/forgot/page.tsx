// pages/forgot.js
"use client";
import axiosInstance from "@/server/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const router = useRouter();

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/user/forgot-password?email=${email}`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        if (response.data) {
          setResetToken(response.data.token);
          setShowResetPassword(true);
        } else {
          setError(response.data.message || "Request failed");
        }
      } else {
        setError(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred during the API request", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/user/reset-password`,
        {
          token: resetToken,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data) {
        router.push("/signin");
      } else {
        setError(response.data.message || "Reset password failed");
      }
    } catch (error) {
      console.error("An error occurred during the API request", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                {showResetPassword ? (
                  <>
                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      Reset Password
                    </h3>
                    <form onSubmit={handleResetSubmit}>
                      <div className="mb-8">
                        <label
                          htmlFor="token"
                          className="mb-3 block text-sm text-dark dark:text-white"
                        >
                          Reset Token
                        </label>
                        <input
                          type="text"
                          name="token"
                          placeholder="Enter your reset token"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="newPassword"
                          className="mb-3 block text-sm text-dark dark:text-white"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                      {error && (
                        <div className="mb-6 text-center text-red-500">
                          {error}
                        </div>
                      )}
                      <div className="mb-6">
                        <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      Forgot Password
                    </h3>
                    <form onSubmit={handleForgotSubmit}>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm text-dark dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                      {error && (
                        <div className="mb-6 text-center text-red-500">
                          {error}
                        </div>
                      )}
                      <div className="mb-6">
                        <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default ForgotPage;

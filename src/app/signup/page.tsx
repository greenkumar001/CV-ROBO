"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axiosInstance from "@/server/server";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/user/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setIsOtpStep(true);
      } else {
        setError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while processing your request.",
      );
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = formData.email;
      const response = await axiosInstance.post(
        `/user/verify-otp?email=${email}&otp=${otp}`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data) {
        router.push("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while processing your request.",
      );
    }
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.mobile
    ) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  return (
    <section
      className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]"
      style={{
        backgroundImage: `url("/images/profile/back.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {isOtpStep ? "Verify OTP" : "Create your account"}
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                {isOtpStep
                  ? "Please enter the OTP sent to your email."
                  : "It’s totally free and super easy"}
              </p>
              {error && (
                <p className="mb-6 text-center text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              {isOtpStep ? (
                <form onSubmit={handleOtpSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="otp"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Verify OTP
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <button className="border-stroke mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                    <span className="mr-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_95:967)">
                          <path
                            d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                            fill="#4285F4"
                          />
                          <path
                            d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                            fill="#34A853"
                          />
                          <path
                            d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10.2043 3.86707C11.422 3.84726 12.5934 4.29689 13.4484 5.10817L17.0226 1.53398C15.3493 0.0106278 12.8547 -0.50544 10.4043 0.272003C7.95389 1.04945 6.01097 2.94695 5.16994 5.36811L8.45942 7.84479C8.84613 6.61988 9.48165 5.5331 10.3038 4.71628C11.126 3.89945 12.0951 3.38618 13.1313 3.23534L10.2043 3.86707Z"
                            fill="#EA4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_95:967">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Sign up with Google
                  </button>
                  <div className="mb-8 flex items-center justify-center">
                    <span className="mr-5 h-[1px] w-full bg-body-color dark:bg-[#3A3A3A]"></span>
                    <span className="text-base font-medium text-body-color dark:text-white">
                      Or
                    </span>
                    <span className="ml-5 h-[1px] w-full bg-body-color dark:bg-[#3A3A3A]"></span>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <label
                        htmlFor="firstName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="lastName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="mobile"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="mb-6">
                      <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </>
              )}
              <p className="text-center text-base font-medium text-body-color">
                Already have an account?
                <Link href="/signin" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
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
              d="M1086.96 297.775C1196.08 200.909 1288.87 80.1326 1427.82 40.9688C1566.76 1.80505 1694.95 94.2948 1767.1 193.936C1839.08 293.729 1844.97 405.52 1894.86 505.468C1944.57 605.277 2038.54 687.773 2044.37 780.315C2050.05 872.719 1968.77 965.025 1871.66 967.878C1774.55 970.732 1661.54 884.133 1532.81 842.008C1404.08 799.736 1259.69 802.086 1151.2 744.025C1042.56 686.11 969.728 567.715 971.067 453.324C972.406 338.884 977.979 394.03 1086.96 297.775Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1066.62 207.421C1175.74 110.555 1268.54 -10.2216 1407.49 -49.3854C1546.42 -88.5492 1674.62 3.94054 1746.76 103.582C1818.74 203.375 1824.63 315.166 1874.52 415.114C1924.24 514.923 2018.21 597.419 2024.04 689.961C2029.73 782.365 1948.45 874.671 1851.34 877.524C1754.23 880.378 1641.22 793.779 1512.49 751.654C1383.76 709.382 1239.37 711.732 1130.82 653.671C1022.19 595.756 949.359 477.361 950.698 362.97C952.036 248.53 957.61 303.676 1066.62 207.421Z"
              fill="url(#paint1_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M929.311 333.319C1004.73 234.927 1065.62 113.456 1169.62 71.2776C1273.48 29.0994 1380.18 122.799 1435.7 222.535C1491.09 322.348 1479.89 419.34 1536.33 518.148C1592.69 617.003 1692.02 678.175 1695.91 759.734C1699.74 841.186 1606.61 884.779 1495.93 888.214C1385.18 891.649 1284.69 839.048 1166.91 795.017C1048.99 750.931 920.142 745.951 827.944 691.966C735.645 637.926 687.17 539.132 684.992 444.505C682.815 349.785 853.441 431.712 929.311 333.319Z"
              fill="url(#paint2_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="553.598"
              y1="882.25"
              x2="1403.75"
              y2="-83.2689"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="491.214"
              y1="991.502"
              x2="1341.37"
              y2="25.9831"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_95:1005"
              x1="318.877"
              y1="912.977"
              x2="1169.03"
              y2="-52.5412"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SignupPage;

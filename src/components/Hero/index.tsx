"use client";
import Link from "next/link";
import "../../styles/index.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [text, setText] = useState("Resume");
  const words = ["Resume", "Quick summary", "Easy & Fast", "Template"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingSpeed = 300;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prev) => {
        if (prev === words[currentIndex]) {
          setTimeout(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === words.length - 1 ? 0 : prevIndex + 1,
            );
          }, typingSpeed * 8);
        }
        return words[currentIndex].slice(0, prev.length + 1);
      });
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, currentIndex]);

  return (
    <>
      <section
        id="home"
        className="relative z-10 h-screen w-full overflow-hidden  to-white pb-10 pt-[80px] md:pb-[100px] md:pt-[100px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[100px] 2xl:pt-[150px]"
        // style={{
        //   backgroundImage: `url("/images/glass2.jpg")`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div className="container">
          <div className="text-center">
            <h1 className="Title mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              India`s 1st <i className="">AI-powered</i> <br />
              <span className="text-pink-500">{text}</span>&nbsp; Assistance
              Platform
            </h1>
            <p className="mb-12 text-base !leading-relaxed text-zinc-950 dark:text-body-color-dark sm:text-lg md:text-xl">
              <b>Build your professional resume! </b>
              cvrobo is your virtual resume assistant who will guide you.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/generate-resume"
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-xl text-white hover:from-purple-400 hover:to-pink-400"
              >
                Start building your resume free
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center space-x-4 space-y-4">
            <div className="h-40 w-60 rotate-6 transform overflow-hidden rounded-lg border border-red-500 bg-orange-100 p-4 shadow-md transition-transform hover:rotate-0">
              <h3 className="font-semibold text-orange-500">Resume</h3>
              <p className="mt-2 text-sm text-gray-600">build in seconds</p>
              <Image
                src="/images/homeBox/1.png"
                width={100}
                height={18}
                alt="Image description"
                className="absolute bottom-0 right-0 border-collapse object-cover opacity-40"
                style={{ transform: "rotate(-30deg)" }}
              />
            </div>

            <div className="h-40 w-60 -rotate-6 transform overflow-hidden rounded-lg border border-green-700 bg-green-100 p-4 shadow-md transition-transform hover:rotate-0">
              <h3 className="font-semibold text-green-500">Quick summary</h3>
              <p className="mt-2 text-sm text-gray-600">
                Automatically create the perfect summary
              </p>
              <Image
                src="/images/homeBox/2.png"
                width={100}
                height={80}
                alt="Image description"
                className="absolute bottom-0 right-0 object-cover opacity-40"
                style={{ transform: "rotate(-30deg)" }}
              />
            </div>

            <div className="h-40 w-60 rotate-6 transform overflow-hidden rounded-lg border border-body-color border-pink-500 bg-pink-100 p-4 shadow-md transition-transform hover:rotate-0">
              <h3 className="font-semibold text-pink-500">Easy & Fast</h3>
              <p className="mt-2 text-sm text-gray-600">
                update the resume in a robust way.
              </p>
              <Image
                src="/images/homeBox/4.png"
                width={100}
                height={80}
                alt="Image description"
                className="absolute bottom-0 right-0 object-cover opacity-40"
                style={{ transform: "rotate(-30deg)" }}
              />
            </div>

            <div className="h-40  w-60 -rotate-6 transform overflow-hidden rounded-lg border border-blue-500 bg-blue-100 p-4 shadow-md transition-transform hover:rotate-0">
              <h3 className="font-semibold text-blue-500">Template</h3>
              <p className="mt-2 text-sm text-gray-600">
                easily select the template
              </p>
              <Image
                src="/images/homeBox/3.png"
                width={100}
                height={80}
                alt="Image description"
                className="absolute bottom-0 right-0 object-cover opacity-40"
                style={{ transform: "rotate(-30deg)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

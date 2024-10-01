"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import axiosInstance1 from "@/server/server1";

const GenerateResumePage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles) => {
    handleFileUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleManualCreateClick = () => {
    router.push("/manual");
  };

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance1.post(
        "/ai/groq/parseResume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const queryParams = new URLSearchParams({
        data: JSON.stringify(response.data),
      }).toString();

      setError(null);
      router.push(`/manual?${queryParams}`);
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg border-green-500 shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full p-4 md:w-1/2">
            <button
              onClick={handleManualCreateClick}
              className="mb-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Manual Create Resume
            </button>
            {loading && (
              <div className="mt-4 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-blue-500"></div>
              </div>
            )}
          </div>
          <div className="w-full p-4 md:w-1/2">
            <div
              {...getRootProps()}
              className={`mb-4 rounded-lg border-2 border-dashed p-6 ${
                isDragActive ? "border-green-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drag drop a file here, or click to select files (PDF, DOCX,
                  etc.)
                </p>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={handleUploadClick}
            />
            <button
              onClick={() => document.getElementById("fileUpload")?.click()}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Upload File
            </button>
            {loading && (
              <div className="mt-4 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-blue-500"></div>
              </div>
            )}
            {error && (
              <div className="mt-4 rounded-lg bg-red-100 p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateResumePage;

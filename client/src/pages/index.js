import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Columns", href: "/columns", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [formData, setFormData] = useState({
    fullname: "",
    sex: 0,
    age: "",
    chestpaintype: 1,
    restingbp: "",
    cholesterol: "",
    bloodsugar: "",
    max_heart_rate: "",
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) return "Full name is required";
    if (!formData.age || formData.age < 1 || formData.age > 90)
      return "Age must be between 1 and 90";
    if (!formData.restingbp || formData.restingbp < 1)
      return "Valid resting BP is required";
    if (!formData.cholesterol || formData.cholesterol < 1)
      return "Valid cholesterol is required";
    if (!formData.bloodsugar || formData.bloodsugar < 1)
      return "Valid blood sugar is required";
    if (!formData.max_heart_rate || formData.max_heart_rate < 1)
      return "Valid max heart rate is required";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict_disease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Disclosure
        as="nav"
        className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95">
                    <img
                      className="h-10 w-10"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-white"
                              : "text-gray-300 hover:bg-indigo-500 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-8 rounded-lg p-4 bg-red-900/50 border border-red-700">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {predictionResult !== null && (
            <div
              className={classNames(
                "mb-8 rounded-lg p-4 transition-all duration-500",
                predictionResult === 1
                  ? "bg-red-900/50 border border-red-700"
                  : "bg-green-900/50 border border-green-700"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HeartIcon
                    className={classNames(
                      "h-6 w-6",
                      predictionResult === 1 ? "text-red-400" : "text-green-400"
                    )}
                  />
                  <p className="text-lg font-semibold text-white">
                    {predictionResult === 1
                      ? "Potential heart condition detected"
                      : "No significant heart condition detected"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 transition-all duration-300">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="relative">
                  <HeartIconSolid className="h-8 w-8 text-red-600 animate-beat" />
                  <div className="absolute -inset-1 bg-indigo-500/20 animate-ping rounded-full" />
                </div>
                Heart Health Prediction
              </h1>
              <p className="mt-2 text-gray-400">
                Enter your health details below for a preliminary heart
                condition assessment
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Sex
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value={1}
                        checked={formData.sex === 1}
                        onChange={handleInputChange}
                        className="form-radio text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">Male</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sex"
                        value={0}
                        checked={formData.sex === 0}
                        onChange={handleInputChange}
                        className="form-radio text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">Female</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="90"
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Chest Pain Type
                  </label>
                  <select
                    name="chestpaintype"
                    value={formData.chestpaintype}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num} className="bg-gray-800">
                        Type {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Resting BP
                  </label>
                  <input
                    type="number"
                    name="restingbp"
                    value={formData.restingbp}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Cholesterol
                  </label>
                  <input
                    type="number"
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Blood Sugar (g/ml)
                  </label>
                  <input
                    type="number"
                    name="bloodsugar"
                    value={formData.bloodsugar}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Max Heart Rate
                  </label>
                  <input
                    type="number"
                    name="max_heart_rate"
                    value={formData.max_heart_rate}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={classNames(
                    "inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  )}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Predict Heart Condition"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes beat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes beat-fast {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes beat-normal {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-beat {
          animation: beat 2s ease-in-out infinite;
        }

        .animate-beat-fast {
          animation: beat-fast 0.8s ease-in-out infinite;
        }

        .animate-beat-normal {
          animation: beat-normal 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

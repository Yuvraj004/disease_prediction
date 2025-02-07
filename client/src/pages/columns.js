import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Columns", href: "/columns", current: true },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Columns() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data && isVisible) {
      // If data exists and is visible, just hide it
      setIsVisible(false);
      return;
    }

    setIsLoading(true);
    try {
      if (!data) {
        // Only fetch if we don't have data
        const response = await fetch("http://localhost:5000/get_data_columns", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const dataI = await response.json();
          setData(dataI);
        }
      }
      // Show the data after fetching or if we already had it
      setIsVisible(true);
    } catch (error) {
      console.error("Error:", error);
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

      <main className="container mx-auto px-4 py-12 animate-fade-in">
        <div className="rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 transition-all duration-300">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <TableCellsIcon className="h-8 w-8 text-indigo-500" />
                Data Columns
              </h1>
              <p className="mt-2 text-gray-400">
                Explore and analyze your available data columns
              </p>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={classNames(
                  "inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95",
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : isVisible
                    ? "bg-red-600 hover:bg-red-500"
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
                    Fetching...
                  </>
                ) : isVisible ? (
                  "Hide Columns"
                ) : (
                  "Show Columns"
                )}
              </button>
            </div>

            <div
              className={classNames(
                "transition-all duration-500 ease-in-out overflow-hidden",
                isVisible ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {data && (
                <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr className="bg-gray-800/50">
                        <th
                          scope="col"
                          className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-gray-300"
                        >
                          Index
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-4 text-left text-sm font-semibold text-gray-300"
                        >
                          Column Name
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {data.Data_Columns.map((columnName, index) => (
                        <tr
                          key={index}
                          className="transition-colors duration-200 hover:bg-indigo-600/10 animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-300">
                            {index}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                            {columnName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Columns;

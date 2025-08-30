import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const journalSummaries = [
    { city: "Hong Kong", entries: 1 },
    { city: "Paris", entries: 2 },
    { city: "New York", entries: 1 },
];

export default function Index() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-6 bg-gray-100">
            <h1 className="text-3xl font-bold">Recent Entries Across the World</h1>
            <div className="flex flex-col space-y-4">
                {journalSummaries.map((summary) => (
                    <div
                        key={summary.city}
                        className="flex items-center justify-between p-4 rounded-lg shadow-md bg-gray-200 hover:bg-gray-300 cursor-pointer border border-gray-400 transition"
                        onClick={() => navigate("/journal", { state: { city: summary.city } })}
                    >
            <span className="text-lg font-medium text-gray-700">
              {summary.entries === 1
                  ? `1 entry from ${summary.city}`
                  : `${summary.entries} entries from ${summary.city}`}
            </span>
                        <FaLock className="text-gray-500 ml-4" />
                    </div>
                ))}
            </div>
        </div>
    );
}

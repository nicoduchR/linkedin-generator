"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";

export function ApiStatus() {
  const [status, setStatus] = useState<string>("Loading...");
  const [timestamp, setTimestamp] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkApi = async () => {
      try {
        // Check health endpoint
        const healthResult = await api.health();
        setStatus(healthResult.status);
        setTimestamp(healthResult.timestamp);
        setService(healthResult.service);
      } catch (err) {
        setError("Error connecting to API");
        setStatus("error");
      }
    };

    checkApi();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">API Status</h2>
      <div className="flex items-center mb-2">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            status === "ok"
              ? "bg-green-500"
              : status === "error"
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        />
        <span>Status: {status}</span>
      </div>

      {timestamp && (
        <div className="mt-2 text-gray-700">
          <p>Last updated: {timestamp}</p>
        </div>
      )}

      {service && (
        <div className="mt-2 text-gray-700">
          <p>Service: {service}</p>
        </div>
      )}

      {error && (
        <div className="mt-2 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

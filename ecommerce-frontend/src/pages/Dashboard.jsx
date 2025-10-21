// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/user/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {data ? <div>Welcome {data.email}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Dashboard;

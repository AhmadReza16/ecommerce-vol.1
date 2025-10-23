import { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/user/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          logoutUser();
        } else {
          setError("Error fetching user data");
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [logoutUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
          {data && (
            <div className="mt-4">
              <p className="text-lg mb-2">
                <span className="font-semibold">Email:</span> {data.email}
              </p>
              {data.username && (
                <p className="text-lg">
                  <span className="font-semibold">Username:</span>{" "}
                  {data.username}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Account.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { axiosInstance } from "../../../config/axiosInstance";

const Account = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    name: "",
    email: ""
  });
  const [phone, setPhone] = useState(""); // Separate state for phone (read-only)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile?.data?.profile) {
      const { name, email, phone } = profile.data.profile;

      // Debug: Log profile to check what's coming in
      console.log("Profile data:", profile.data.profile);

      setEditableProfile({
        name: name || "",
        email: email || ""
      });

      setPhone(phone || ""); // Set phone separately (read-only)
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put("/user/update-profile", editableProfile);

      if (response.data) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Account</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Name */}
      <div className="mb-4">
        <label className="flex items-center font-medium text-gray-700 mb-1">
          <FiUser className="mr-2" /> Name
        </label>
        <input
          type="text"
          name="name"
          value={editableProfile.name}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
          }`}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="flex items-center font-medium text-gray-700 mb-1">
          <FiMail className="mr-2" /> Email
        </label>
        <input
          type="email"
          name="email"
          value={editableProfile.email}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
          }`}
        />
      </div>

      {/* Phone (read-only) */}
      {/* <div className="mb-6">
        <label className="flex items-center font-medium text-gray-700 mb-1">
          <FiPhone className="mr-2" /> Phone
        </label>
        <div className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md">
          {phone || "Not provided"}
        </div>
      </div> */}

      {/* Edit / Save Button */}
      <div className="text-center">
        {isEditing ? (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-50"
          >
            <FaSave /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;

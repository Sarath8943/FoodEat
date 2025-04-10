import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

const Account = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(null);

  const toggleEdit = () => {
    if (isEditing) {
      // Save logic here
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableProfile(profile?.data.profile);
    }
  };

  const handleChange = (e) => {
    setEditableProfile({ ...editableProfile, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800 tracking-tight">
          👤 Personal Information
        </h2>
        <button
          onClick={toggleEdit}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
            isEditing
              ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:brightness-110"
              : "bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 hover:shadow-inner"
          }`}
        >
          {isEditing ? (
            <>
              <FaSave className="h-4 w-4" />
              <span>Save</span>
            </>
          ) : (
            <>
              <FaEdit className="h-4 w-4" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <FiUser className="mr-2 text-blue-500" />
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableProfile?.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-4 focus:ring-yellow-300 bg-white/90 backdrop-blur-md text-gray-800 transition-all"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 shadow-sm">
              {profile?.data.profile.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
            <FiMail className="mr-2 text-blue-500" />
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableProfile?.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-4 focus:ring-yellow-300 bg-white/90 backdrop-blur-md text-gray-800 transition-all"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 shadow-sm">
              {profile?.data.profile.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        {profile?.data.profile.phone && (
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <FiPhone className="mr-2 text-blue-500" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editableProfile?.phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-4 focus:ring-yellow-300 bg-white/90 backdrop-blur-md text-gray-800 transition-all"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 shadow-sm">
                {profile?.data.profile.phone}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

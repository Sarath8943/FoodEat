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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Personal Information
        </h2>
        <button
          onClick={toggleEdit}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isEditing
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          } transition-colors duration-200`}
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FiUser className="mr-2 text-gray-500" />
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editableProfile?.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          ) : (
            <p className="mt-1 px-4 py-2 text-gray-800">
              {profile?.data.profile.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FiMail className="mr-2 text-gray-500" />
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableProfile?.email || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          ) : (
            <p className="mt-1 px-4 py-2 text-gray-800">
              {profile?.data.profile.email}
            </p>
          )}
        </div>

        {/* Phone Field - Add if your profile has phone number */}
        {profile?.data.profile.phone && (
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FiPhone className="mr-2 text-gray-500" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editableProfile?.phone || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            ) : (
              <p className="mt-1 px-4 py-2 text-gray-800">
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

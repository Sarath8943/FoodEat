import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { axiosInstance } from "../../../config/axiosInstance";

function SavedAddresses({ addresses, fetchData }) {
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/address/deleteAddress/${addressId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address._id);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/address/updateAddress/${editingAddress}`,
        formData
      );
      setEditingAddress(null);
      fetchData();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FiMapPin className="mr-2 text-amber-500" />
          Saved Addresses
        </h2>
      </div>

      {addresses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) =>
            editingAddress === address._id ? (
              <div
                key={address._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <FiEdit2 className="mr-2 text-amber-500" />
                  Edit Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setEditingAddress(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={address._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <FiMapPin className="mr-2 text-amber-500" />
                      {address.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {address.street}, {address.city}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {address.state} - {address.postalCode}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto h-16 w-16 text-gray-400 mb-3">
            <FiMapPin className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No saved addresses
          </h3>
          <p className="mt-1 text-gray-500">
            Add your first address to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default SavedAddresses;

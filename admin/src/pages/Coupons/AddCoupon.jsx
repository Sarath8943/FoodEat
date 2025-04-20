import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const isEdit = Boolean(data);
  const [formData, setFormData] = useState({
    code: data?.code || "",
    discountPercentage: data?.discountPercentage || "",
    maxDiscountValue: data?.maxDiscountValue || "",
    minOrderValue: data?.minOrderValue || "",
    expiryDate: data?.expiryDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = data
        ? `/coupon/update-coupon/${data._id}`
        : "/coupon/create-coupon";

      const response = await axiosInstance.post(endpoint, formData);
      if (response.status === 200) {
        alert(response?.data?.message);
        setFormData({
          code: "",
          discountPercentage: "",
          maxDiscountValue: "",
          minOrderValue: "",
          expiryDate: "",
        });
      }
    } catch (error) {
      alert(
        `Error: ${
          error.response ? error.response?.data?.message : error.message
        }`
      );
    } finally {
      navigate(-1, { state: { refreshOnReturn: true } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isEdit ? "Edit Coupon" : "Create Coupon"}
          </h2>
          <p className="text-white-600">
            {isEdit ? "Update your coupon details" : "Add a new discount coupon for your customers"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: "code", label: "Coupon Code", type: "text", placeholder: "e.g. SUMMER20" },
            { id: "discountPercentage", label: "Discount Percentage", type: "number", placeholder: "e.g. 15" },
            { id: "maxDiscountValue", label: "Maximum Discount Value", type: "number", placeholder: "e.g. 500" },
            { id: "minOrderValue", label: "Minimum Order Value", type: "number", placeholder: "e.g. 1000" },
            { id: "expiryDate", label: "Expiry Date", type: "date" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="space-y-2">
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <div className="relative">
                {type === "number" && (
                  <span className="absolute left-3 top-3 text-gray-500">
                    {id === "discountPercentage" ? "%" : "₹"}
                  </span>
                )}
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  min={type === "number" ? "0" : undefined}
                  className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    type === "number" ? "pl-8" : ""
                  }`}
                />
              </div>
            </div>
          ))}

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {isEdit ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
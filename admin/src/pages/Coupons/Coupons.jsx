import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../Hooks/UseFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";
import { formatDate } from "../../utils/Moment";

function Coupons() {
  const [coupons, isLoading, error, fetchData] = useFetch("/coupon/get-coupon");
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate("/add-coupon");
  };

  const handleEditCoupon = (row) => {
    navigate("/add-coupon", { state: { data: row, refreshOnReturn: true } });
  };

  useEffect(() => {
    if (location.state?.refreshOnReturn) {
      fetchData();
      location.state.refreshOnReturn = false;
    }
  }, [location.state, fetchData]);

  const handleDeleteCoupon = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await axiosInstance.delete(`/coupon/delete-coupon/${id}`);
        alert("Coupon deleted successfully");
        fetchData();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Discount %",
      selector: (row) => row.discountPercentage,
      sortable: true,
    },
    {
      name: "Max Discount",
      selector: (row) => row.maxDiscountValue,
      sortable: true,
    },
    {
      name: "Min Order",
      selector: (row) => row.minOrderValue,
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: (row) => formatDate(row.expiryDate),
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => (
        <span className={row.isActive ? "text-green-600 font-semibold" : "text-gray-500"}>
          {row.isActive ? "Yes" : "No"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => handleEditCoupon(row)}
            title="Edit"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Pencil className="w-5 h-5 text-blue-500 hover:text-blue-700" />
          </button>
          <button
            onClick={() => handleDeleteCoupon(row._id)}
            title="Delete"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Coupons</h2>
          <button
            onClick={handleAddCoupon}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-200 transform hover:scale-105"
          >
            + Add Coupon
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg font-medium">{error.message}</p>
            <button
              onClick={fetchData}
              className="mt-4 text-indigo-600 hover:text-indigo-800 underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={coupons?.coupons || []}
              pagination
              highlightOnHover
              responsive
              className="bg-white dark:bg-gray-800"
              noDataComponent={
                <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                  No coupons found.
                </div>
              }
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#f3f4f6",
                    color: "#1f2937",
                    fontSize: "15px",
                    fontWeight: "600",
                    borderBottom: "1px solid #e5e7eb",
                  },
                },
                rows: {
                  style: {
                    fontSize: "14px",
                    minHeight: "60px",
                    borderBottom: "1px solid #e5e7eb",
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: "#f9fafb",
                    color: "#4b5563",
                    padding: "1rem",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Coupons;


import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, ArrowRight } from "lucide-react";

const RestaurantsOrders = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/restaurant");
      setRestaurants(response.data);
    } catch (err) {
      setError("Failed to fetch restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (data) => {
    navigate(`/orders/${data._id}`);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
      cell: (row, index) => (
        <span className="text-gray-500 font-medium">{index + 1}</span>
      )
    },
    {
      name: "Restaurant Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-3">
          {row.image && (
            <img 
              src={row.image} 
              alt={row.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span
            className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer transition-colors duration-200"
            onClick={() => handleRestaurantClick(row)}
          >
            {row.name}
          </span>
        </div>
      ),
    },
    {
      name: "View Orders",
      cell: (row) => (
        <button
          onClick={() => handleRestaurantClick(row)}
          className="flex items-center space-x-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-200"
        >
          <span>View</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ),
      width: "150px",
      center: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Restaurants Orders</h1>
            <p className="mt-1 text-sm text-gray-500">
              Select a restaurant to view its orders
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate("/add-restaurant")} // Update with your actual route
          >
            Add Restaurant
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={fetchRestaurants}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Retry
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={restaurants}
              pagination
              highlightOnHover
              striped
              responsive
              noDataComponent={
                <div className="py-10 text-center text-gray-500">
                  No restaurants found. Add a restaurant to get started.
                </div>
              }
              customStyles={{
                head: {
                  style: {
                    backgroundColor: '#f9fafb',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  },
                },
                headRow: {
                  style: {
                    borderTopWidth: '1px',
                    borderTopColor: '#f3f4f6',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#f3f4f6',
                  },
                },
                headCells: {
                  style: {
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    color: '#6b7280',
                  },
                },
                cells: {
                  style: {
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                  },
                },
                rows: {
                  style: {
                    fontSize: '0.875rem',
                    '&:not(:last-of-type)': {
                      borderBottomWidth: '1px',
                      borderBottomColor: '#f3f4f6',
                    },
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsOrders;



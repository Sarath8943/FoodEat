
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

const AllRestaurants = () => {
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

  const handleAddRestaurant = () => {
    navigate("/edit-restaurant");
  };

  const handleEditRestaurant = (row) => {
    navigate(`/edit-restaurant`, { state: { data: row } });
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axiosInstance.delete(`/restaurant/${id}`);
        alert("Restaurant deleted successfully.");
        fetchRestaurants();
      } catch {
        alert("Failed to delete restaurant. Please try again.");
      }
    }
  };

  const statusBadge = (status) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      cell: (row, index) => <span className="text-gray-500">{index + 1}</span>,
      width: "80px"
    },
    {
      name: "Photo",
      cell: (row) => (
        <div className="py-2">
          <img 
            className="w-16 h-16 rounded-md object-cover" 
            src={row.image} 
            alt={row.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/100";
            }}
          />
        </div>
      ),
      width: "120px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => <span className="font-medium">{row.name}</span>,
      sortable: true
    },
    {
      name: "Cuisine",
      selector: (row) => row.cuisine,
      cell: (row) => <span className="text-gray-600">{row.cuisine}</span>,
      sortable: true
    },
    {
      name: "Location",
      selector: (row) => row.location,
      cell: (row) => <span className="text-gray-600">{row.location}</span>,
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => statusBadge(row.status),
      sortable: true,
      width: "120px"
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => handleEditRestaurant(row)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteRestaurant(row._id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
      width: "120px"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Restaurants</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all restaurant listings
            </p>
          </div>
          <button
            onClick={handleAddRestaurant}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
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

export default AllRestaurants;





import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { axiosInstance } from '../../config/axiosInstance'; 
import DataTable from 'react-data-table-component';
import { Pencil, Trash2 } from 'lucide-react';

const MenuItems = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/restaurant/${id}`);
      setMenuItems(response.data.menuItems);
    } catch (err) {
      setError("Failed to fetch menu items.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItems = () => {
    navigate(`/addItems/${id}`);
  };

  const handleEditMenuItems = (row) => {
    navigate(`/addItems/${id}`, {state: {data: row}}); 
  };

  const handleDeleteMenuItems = async (menuId) => {

    
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axiosInstance.delete(`/restaurant/${id}/${menuId}/deleteMenu`);
        alert("Menu item deleted successfully.");
        fetchMenuItems();
      } catch {
        alert("Failed to delete menu item. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [id]);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px"
    },
    {
      name: "Photo",
      cell: (row) => (
        <div className='p-2'>
          <img 
            className='w-16 h-16 object-cover rounded-md' 
            src={row.image} 
            alt={row.name}
          />
        </div>
      ),
      width: "120px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.name}</span>
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => <span className="text-green-600 font-semibold">${row.price.toFixed(2)}</span>,
      width: "120px"
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-4">
          <button 
            onClick={() => handleEditMenuItems(row)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleDeleteMenuItems(row._id)}
            className="text-red-500 hover:text-red-700 transition-colors"
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Menu Items</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center"
          onClick={handleAddMenuItems}
        >
          <span>+ Add Items</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={fetchMenuItems}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Retry
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={menuItems}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className="py-10 text-center text-gray-500">
                No menu items found. Add some items to get started.
              </div>
            }
            customStyles={{
              head: {
                style: {
                  backgroundColor: '#f8fafc',
                },
              },
              headRow: {
                style: {
                  borderTopWidth: '1px',
                  borderTopColor: '#f1f5f9',
                  borderBottomWidth: '1px',
                  borderBottomColor: '#f1f5f9',
                },
              },
              headCells: {
                style: {
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#334155',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                },
              },
              cells: {
                style: {
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                },
              },
              rows: {
                style: {
                  fontSize: '0.875rem',
                  '&:not(:last-of-type)': {
                    borderBottomWidth: '1px',
                    borderBottomColor: '#f1f5f9',
                  },
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItems;










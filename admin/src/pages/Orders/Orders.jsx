

import React from 'react';
import { useParams } from 'react-router';
import useFetch from '../../Hooks/UseFetch';
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../config/axiosInstance';


const Orders = () => {
  const { id } = useParams();
  const [orderData, isLoading, error] = useFetch(`/order/get-all-restaurant-orders/${id}`);
  const orders = orderData?.orders;

  const updateOrderStatus = async (orderId) => {
    try {
      await axiosInstance.patch(`/order/update-order-status/${orderId}`);
      alert("Order status updated successfully");
      window.location.reload();
    } catch (error) {
      alert("Failed to update order status. Please try again.");
    }
  };

  const statusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const columns = [
    {
      name: 'Order ID',
      selector: row => row._id,
      cell: row => <span className="font-mono text-sm text-gray-600">{row._id.substring(0, 8)}...</span>,
      width: '150px'
    },
    {
      name: 'Restaurant',
      selector: row => row.restaurant?.name || 'N/A',
      cell: row => <span className="font-medium">{row.restaurant?.name || 'N/A'}</span>
    },
    {
      name: 'Status',
      selector: row => row.status,
      cell: row => statusBadge(row.status),
      width: '150px'
    },
    {
      name: 'Total Price',
      selector: row => row.finalPrice,
      cell: row => <span className="font-semibold">${row.finalPrice?.toFixed(2) || '0.00'}</span>,
      width: '120px'
    },
    {
      name: 'Order Date',
      selector: row => new Date(row.createdAt).toLocaleString(),
      cell: row => (
        <div className="text-sm text-gray-500">
          {new Date(row.createdAt).toLocaleDateString()}
          <br />
          {new Date(row.createdAt).toLocaleTimeString()}
        </div>
      ),
      width: '180px'
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => updateOrderStatus(row._id)}
          disabled={row.status === 'delivered'}
          className={`
            px-4 py-2 rounded-md font-medium transition-colors
            ${row.status === 'delivered' 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}
          `}
        >
          Update Status
        </button>
      ),
      width: '160px'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage all restaurant orders
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 text-lg">Error loading orders: {error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Refresh
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={orders || []}
              pagination
              highlightOnHover
              striped
              responsive
              noDataComponent={
                <div className="py-10 text-center text-gray-500">
                  No orders found for this restaurant.
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

export default Orders;



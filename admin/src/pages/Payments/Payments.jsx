
import React from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../Hooks/UseFetch";

function Payments() {
    const [paymentsData, isLoading, error] = useFetch(`/order/get-all-payments`);

    const statusBadge = (status) => {
        const statusColors = {
            completed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800',
            refunded: 'bg-blue-100 text-blue-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    const columns = [
        {
            name: "Order ID",
            selector: (row) => row.orderId,
            cell: (row) => <span className="font-mono text-sm text-gray-600">{row.orderId?.substring(0, 8)}...</span>,
            width: '150px'
        },
        {
            name: "User",
            selector: (row) => row.user?.name,
            cell: (row) => <span className="font-medium">{row.user?.name || 'Guest'}</span>,
            sortable: true
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
            cell: (row) => <span className="font-semibold text-green-600">${row.amount?.toFixed(2)}</span>,
            sortable: true,
            width: '120px'
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => statusBadge(row.status),
            sortable: true,
            width: '150px'
        },
        {
            name: "Transaction ID",
            selector: (row) => row.transactionId,
            cell: (row) => <span className="font-mono text-sm">{row.transactionId?.substring(0, 8)}...</span>,
            width: '180px'
        },
        {
            name: "Date",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            cell: (row) => (
                <div className="text-sm text-gray-500">
                    {new Date(row.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(row.createdAt).toLocaleTimeString()}
                </div>
            ),
            sortable: true,
            width: '180px'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Payment Records</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        View all payment transactions and their status
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500 text-lg">Error loading payments: {error.message}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Refresh Data
                            </button>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={paymentsData?.data || []}
                            pagination
                            highlightOnHover
                            striped
                            responsive
                            noDataComponent={
                                <div className="py-10 text-center text-gray-500">
                                    No payment records found.
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
}

export default Payments;

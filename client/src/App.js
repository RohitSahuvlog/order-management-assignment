import React, { useState } from 'react';
import { useTable } from 'react-table';
import 'tailwindcss/tailwind.css';

function App() {
  const [city, setCity] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/fetch-orders?city=${city}&orderDate=${orderDate}&status=${paymentStatus}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  // Prepare the data for the table
  const data = React.useMemo(() => {
    return users.flatMap(user =>
      user.orders.map(order => ({
        userName: `${user.firstName} ${user.lastName}`,
        address: `${user.address.streetNo}, ${user.address.city}`,
        orderId: order.orderId,
        orderedAt: new Date(order.orderedAt).toLocaleDateString(),
        productInfo: `${order.product.name} - ${order.product.description} ($${order.product.price.toFixed(2)})`,
      }))
    );
  }, [users]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Order ID',
        accessor: 'orderId',
      },
      {
        Header: 'Order Date',
        accessor: 'orderedAt',
      },
      {
        Header: 'Product Information',
        accessor: 'productInfo',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <div className="m-6 flex items-center justify-center shadow-gray-800">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 flex items-center text-center justify-center">Order Management</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderDate">
              Order Date
            </label>
            <input
              id="orderDate"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentStatus">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select payment status</option>
              <option value="successful">Successful</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="mx-4 bg-gray-100">
        {users.length > 0 ? (
          <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-bold text-gray-600"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;

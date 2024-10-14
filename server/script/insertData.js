const axios = require('axios');

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

// Function to insert users and return their IDs
const insertUsers = async () => {
    const users = [
        {
            firstName: "Alice",
            lastName: "Johnson",
            phoneNo: "5551234567",
            email: "alice1.johnson@example.com",
            address: {
                city: "New York",
                country: "USA",
                streetNo: "789"
            }
        },
        {
            firstName: "Bob",
            lastName: "Williams",
            phoneNo: "6669876543",
            email: "bob1.williams@example.com",
            address: {
                city: "Los Angeles",
                country: "USA",
                streetNo: "101"
            }
        },
        {
            firstName: "Charlie",
            lastName: "Brown",
            phoneNo: "7772345678",
            email: "bob2.williams@example.com",
            address: {
                city: "Los Angeles",
                country: "USA",
                streetNo: "101"
            }
        }
    ];

    const userIds = [];

    for (const user of users) {
        try {
            const response = await axios.post(`${API_URL}/users`, user);
            console.log(`Inserted user: ${response.data.firstName} ${response.data.lastName}`);
            userIds.push(response.data._id);
        } catch (error) {
            console.error('Error inserting user:', error.response ? error.response.data : error.message);
        }
    }

    return userIds;
};

const insertProducts = async () => {
    const products = [
        { name: 'Product 1', description: 'Description 1', price: 100 },
        { name: 'Product 2', description: 'Description 2', price: 200 },
        { name: 'Product 3', description: 'Description 3', price: 300 },
        { name: 'Product 4', description: 'Description 4', price: 400 },
        { name: 'Product 5', description: 'Description 5', price: 500 },
        { name: 'Product 6', description: 'Description 6', price: 600 }


    ];

    const productIds = [];

    for (const product of products) {
        try {
            const response = await axios.post(`${API_URL}/products`, product);
            console.log(`Inserted product: ${response.data.name}`);
            productIds.push(response.data._id);
        } catch (error) {
            console.error('Error inserting product:', error.response ? error.response.data : error.message);
        }
    }

    return productIds;
};

const insertOrders = async (userIds, productIds) => {
    const orders = [
        {
            userId: userIds[0],
            productId: productIds[0],
            orderedAt: new Date()
        },
        {
            userId: userIds[1],
            productId: productIds[1],
            orderedAt: new Date()
        },
        {
            userId: userIds[2],
            productId: productIds[2],
            orderedAt: new Date()
        },
        {
            userId: userIds[0],
            productId: productIds[3],
            orderedAt: new Date(),
        },
        {
            userId: userIds[1],
            productId: productIds[4],
            orderedAt: new Date()
        },
        {
            userId: userIds[2],
            productId: productIds[5],
            orderedAt: new Date()
        }

    ];
    let orderIds = [];
    for (const order of orders) {
        try {
            const response = await axios.post(`${API_URL}/orders`, order);
            console.log(response)
            console.log(`Inserted order: ${response.data.orderId}`);
            orderIds.push(response.data._id);
        } catch (error) {
            console.error('Error inserting order:', error.response ? error.response.data : error.message);
        }
    }

    return orderIds;

};

// Function to insert payments
const insertPayments = async (orderIds) => {
    const payments = [
        {
            orderId: orderIds[0],
            paymentStatus: "failed"
        },
        {
            orderId: orderIds[1],
            paymentStatus: "successfull"
        },
        {
            orderId: orderIds[2],
            paymentStatus: "failed"
        },
        {
            orderId: orderIds[0],
            paymentStatus: "successfull"
        },
        {
            orderId: orderIds[1],
            paymentStatus: "failed"
        },
        {
            orderId: orderIds[2],
            paymentStatus: "pending",
        }
    ];

    for (const payment of payments) {
        try {
            const response = await axios.post(`${API_URL}/payments`, payment);
            console.log(`Inserted payment: ${response.data.paymentId}`);
        } catch (error) {
            console.error('Error inserting payment:', error.response ? error.response.data : error.message);
        }
    }
};

// Insert data
const insertData = async () => {
    try {
        const userIds = await insertUsers();
        const productIds = await insertProducts();
        const orderIds = await insertOrders(userIds, productIds);
        console.log(orderIds);
        await insertPayments(orderIds);
        console.log(userIds, productIds, orderIds);
        console.log('Data insertion completed.');
    } catch (error) {
        console.error('Error during data insertion:', error);
    }
};

insertData();

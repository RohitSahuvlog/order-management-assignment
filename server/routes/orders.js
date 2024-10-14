const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Product = require('../models/Product');

// Get users with failed payments on a specific date in a specific city
router.get('/fetch-orders', async (req, res) => {
    const { city, orderDate, status } = req.query;

    try {
        // Validate inputs
        if (!city || !orderDate || !status) {
            return res.status(400).send({ message: 'City, order date, and status  are required' });
        }


        // Create date range for filtering orders by orderedAt
        const startDate = new Date(orderDate);
        const endDate = new Date(new Date(orderDate).setDate(startDate.getDate() + 1)); // End date is the next day

        // Find failed payments and populate order information
        const payments = await Payment.find({ paymentStatus: status }).populate({
            path: 'orderId',
            populate: {
                path: 'productId',
                model: Product,
            },
        });

        console.log(payments);

        // Filter valid orders and those within the specified date range
        const validOrders = payments
            .map(payment => payment.orderId)
            .filter(order => order && order.orderedAt >= startDate && order.orderedAt < endDate);

        // Get user details from the valid orders
        const users = await User.find({
            _id: { $in: validOrders.map(order => order.userId) },
            'address.city': city
        }).populate('address');

        console.log(users);

        // Map users with their respective orders and product information
        const response = users.map(user => {
            const userOrders = validOrders.filter(order => order.userId.toString() === user._id.toString());
            return {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNo: user.phoneNo,
                email: user.email,
                address: user.address,
                orders: userOrders.map(order => ({
                    orderId: order._id,
                    orderedAt: order.orderedAt,
                    product: order.productId
                })),
            };
        });

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while fetching data', error });
    }
});

module.exports = router;

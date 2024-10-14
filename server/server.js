const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Payment = require('./models/Payment');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// app.use('/api', userRoutes);
app.use('/api', orderRoutes);



// Create a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create a new product
app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create a new payment
app.post('/api/payments', async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => console.error(error));

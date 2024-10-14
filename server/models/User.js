const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    streetNo: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: AddressSchema },
});

module.exports = mongoose.model('User', userSchema);
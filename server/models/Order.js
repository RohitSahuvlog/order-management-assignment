const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderedAt: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);

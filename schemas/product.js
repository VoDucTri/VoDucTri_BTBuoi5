let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    imgURL: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     images: [{
//         type: String,
//         required: true
//     }],
//     category: {
//         type: String,
//         required: true,
//         enum: ['Sarees', 'Lehengas', 'Gowns', 'Suits', 'Kurtis']
//     },
//     sizes: [{
//         type: String,
//         required: true
//     }],
//     stock: {
//         type: Map,
//         of: Number,
//         default: new Map()
//     },
//     details: [{
//         type: String
//     }],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Update the updatedAt timestamp before saving
// productSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// // Method to check if a specific size is in stock
// productSchema.methods.isSizeInStock = function (size, quantity = 1) {
//     return (this.stock.get(size) || 0) >= quantity;
// };

// // Method to update stock for a specific size
// productSchema.methods.updateStock = function (size, quantity) {
//     const currentStock = this.stock.get(size) || 0;
//     this.stock.set(size, currentStock + quantity);
// };

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product; 






const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true,
        enum: ['Sarees', 'Lehengas', 'Gowns', 'Suits', 'Kurtis']
    },
    sizes: [{
        type: String,
        required: true
    }],
    stock: {
        type: Map,
        of: Number,
        default: new Map()
    },
    details: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Transform method to handle Map serialization
productSchema.methods.toJSON = function () {
    const product = this.toObject();

    // Convert Map to plain object for JSON serialization
    if (product.stock && product.stock instanceof Map) {
        product.stock = Object.fromEntries(product.stock);
    }

    return product;
};

// Virtual field for inStock
productSchema.virtual('inStock').get(function () {
    if (!this.stock) return false;

    if (this.stock instanceof Map) {
        for (const [size, quantity] of this.stock) {
            if (quantity > 0) return true;
        }
    } else if (typeof this.stock === 'object') {
        for (const [size, quantity] of Object.entries(this.stock)) {
            if (quantity > 0) return true;
        }
    }

    return false;
});

// Ensure virtual fields are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Method to check if a specific size is in stock
productSchema.methods.isSizeInStock = function (size, quantity = 1) {
    return (this.stock.get(size) || 0) >= quantity;
};

// Method to update stock for a specific size
productSchema.methods.updateStock = function (size, quantity) {
    const currentStock = this.stock.get(size) || 0;
    this.stock.set(size, currentStock + quantity);
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
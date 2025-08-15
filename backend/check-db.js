const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function checkDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poonam-ladies-wear');
        console.log('✅ Connected to MongoDB');

        // Check if products exist
        const productCount = await Product.countDocuments({});
        console.log(`📊 Total products in database: ${productCount}`);

        if (productCount === 0) {
            console.log('⚠️  No products found in database. Importing sample products...');

            // Import products
            const products = require('./simple-products');
            const insertedProducts = await Product.insertMany(products);
            console.log(`✅ Successfully imported ${insertedProducts.length} products`);

            // Show imported products
            insertedProducts.forEach(product => {
                console.log(`- ${product.name}: ₹${product.price} (Category: ${product.category})`);
            });
        } else {
            console.log('✅ Database has products. Checking sample product...');

            // Check a sample product
            const sampleProduct = await Product.findOne({});
            console.log('Sample product:', {
                name: sampleProduct.name,
                price: sampleProduct.price,
                stock: sampleProduct.stock,
                inStock: sampleProduct.inStock
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

checkDatabase();

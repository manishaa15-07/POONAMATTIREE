const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const featuredProducts = [
    {
        name: 'Summer Collection Dress',
        description: 'Elegant summer dress perfect for casual outings and special occasions. Made with breathable fabric and comfortable fit.',
        price: 1299,
        images: ['https://juniperfashion.com/cdn/shop/files/DSC_8493.jpg?v=1744781101&width=1000'],
        category: 'Dresses',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: new Map([
            ['XS', 5],
            ['S', 8],
            ['M', 10],
            ['L', 6],
            ['XL', 4]
        ]),
        details: ['100% Cotton', 'Machine washable', 'Comfortable fit'],
        featured: true,
        recommended: false
    },
    {
        name: 'Casual Wear Set',
        description: 'Stylish casual wear set including top and bottom. Perfect for daily wear and comfortable for all-day use.',
        price: 999,
        images: ['https://juniperfashion.com/cdn/shop/files/P1029D_MINT_5.jpg?v=1743491042&width=1000'],
        category: 'Suit Sets',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 6],
            ['M', 8],
            ['L', 5],
            ['XL', 3]
        ]),
        details: ['Polyester blend', 'Easy care', 'Modern design'],
        featured: true,
        recommended: false
    },
    {
        name: 'Party Wear Gown',
        description: 'Stunning party wear gown perfect for special occasions. Features elegant embroidery and premium fabric.',
        price: 2499,
        images: ['https://www.aachho.com/cdn/shop/files/2_6d7d8016-9b61-4614-949c-e588c7f19dbd_720x.jpg?v=1748678089'],
        category: 'Gowns',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: new Map([
            ['XS', 3],
            ['S', 5],
            ['M', 7],
            ['L', 4],
            ['XL', 2]
        ]),
        details: ['Premium fabric', 'Hand embroidery', 'Perfect fit'],
        featured: true,
        recommended: false
    },
    {
        name: 'Designer Kurti Set',
        description: 'Beautiful designer kurti set with matching bottom. Perfect for traditional occasions and daily wear.',
        price: 899,
        images: ['https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_400,h_514/https://kurtifashion.com/wp-content/uploads/2023/02/Cotton-Long-Kurti-Set-1-sd2fss2-400x514.jpg'],
        category: 'Kurtis',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 8],
            ['M', 10],
            ['L', 6],
            ['XL', 4]
        ]),
        details: ['Pure cotton', 'Traditional design', 'Comfortable fit'],
        featured: true,
        recommended: false
    },
    {
        name: 'Elegant Saree',
        description: 'Traditional elegant saree with beautiful border work. Perfect for festivals and special occasions.',
        price: 1899,
        images: ['https://5.imimg.com/data5/SELLER/Default/2023/4/298081329/GT/CK/TD/148854516/ladies-party-wear-gown-500x500.jpeg'],
        category: 'Sarees',
        sizes: ['Free Size'],
        stock: new Map([
            ['Free Size', 12]
        ]),
        details: ['Silk blend', 'Traditional border', 'Elegant design'],
        featured: true,
        recommended: false
    },
    {
        name: 'Casual Bottom',
        description: 'Comfortable casual bottom perfect for daily wear. Made with stretchable fabric for maximum comfort.',
        price: 599,
        images: ['https://images.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw1b6903a8/images/aw23/btmw19788aw23mrn_1.jpg?sw=242&sh=363'],
        category: 'Bottoms',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 10],
            ['M', 12],
            ['L', 8],
            ['XL', 6]
        ]),
        details: ['Stretchable fabric', 'Comfortable fit', 'Daily wear'],
        featured: true,
        recommended: false
    }
];

const recommendedProducts = [
    {
        name: 'Anarkali Dress',
        description: 'Traditional anarkali dress with beautiful border work. Perfect for festivals and special occasions.',
        price: 1899,
        images: ['https://subhvastra.in/cdn/shop/files/mihika-blue-georgette-flared-anarkali-suit-set_7_2048x.jpg?v=1734161853'],
        category: 'Dresses',
        sizes: ['Free Size'],
        stock: new Map([
            ['Free Size', 12]
        ]),
        details: ['Traditional border', 'Elegant design'],
        featured: false,
        recommended: true
    },
    {
        name: 'Designer Kurti Set',
        description: 'Beautiful designer kurti set with matching bottom. Perfect for traditional occasions and daily wear.',
        price: 899,
        images: ['https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_400,h_514/https://kurtifashion.com/wp-content/uploads/2023/02/Cotton-Long-Kurti-Set-1-sd2fss2-400x514.jpg'],
        category: 'Kurtis',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 8],
            ['M', 10],
            ['L', 6],
            ['XL', 4]
        ]),
        details: ['Pure cotton', 'Traditional design', 'Comfortable fit'],
        featured: false,
        recommended: true
    },
    {
        name: 'Casual Bottom',
        description: 'Comfortable casual bottom perfect for daily wear. Made with stretchable fabric for maximum comfort.',
        price: 599,
        images: ['https://images.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw1b6903a8/images/aw23/btmw19788aw23mrn_1.jpg?sw=242&sh=363'],
        category: 'Bottoms',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 10],
            ['M', 12],
            ['L', 8],
            ['XL', 6]
        ]),
        details: ['Stretchable fabric', 'Comfortable fit', 'Daily wear'],
        featured: false,
        recommended: true
    },
    {
        name: 'Designer Crop Top',
        description: 'Stylish designer crop top perfect for parties and casual outings. Features modern design and comfortable fit.',
        price: 799,
        images: ['https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-purple-printed-semicrepe-designer-readymadelehenga-gcfe0040766_purple_1_6_large.jpg?v=1729595563'],
        category: 'CropTop',
        sizes: ['XS', 'S', 'M', 'L'],
        stock: new Map([
            ['XS', 5],
            ['S', 8],
            ['M', 10],
            ['L', 6]
        ]),
        details: ['Premium fabric', 'Modern design', 'Perfect fit'],
        featured: false,
        recommended: true
    },
    {
        name: 'Ready Made Suit Set',
        description: 'Beautiful ready-made suit set perfect for traditional occasions. Includes top, bottom, and dupatta.',
        price: 1599,
        images: ['https://www.koskii.com/cdn/shop/files/Tile-Baner-Ready-Made-Sets.jpg?v=1750066613&width=720'],
        category: 'Suit Sets',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: new Map([
            ['S', 6],
            ['M', 8],
            ['L', 5],
            ['XL', 4]
        ]),
        details: ['Complete set', 'Traditional design', 'Premium quality'],
        featured: false,
        recommended: true
    },
    {
        name: 'Dress Material',
        description: 'High-quality dress material perfect for custom tailoring. Available in various colors and patterns.',
        price: 699,
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqR-cjw4JBd0RhsYXm0FXbg45S0U_YWYm8g&s'],
        category: 'Dress Materials',
        sizes: ['Free Size'],
        stock: new Map([
            ['Free Size', 15]
        ]),
        details: ['High quality fabric', 'Various patterns', 'Custom tailoring'],
        featured: false,
        recommended: true
    }
];

async function updateHomepage() {
    try {
        await connectDB();
        console.log('✅ Connected to database');

        // First, clear all featured and recommended flags from existing products
        await Product.updateMany(
            { $or: [{ featured: true }, { recommended: true }] },
            { $set: { featured: false, recommended: false } }
        );
        console.log('✅ Cleared existing featured and recommended flags');

        // Update or create featured products
        for (const productData of featuredProducts) {
            const existingProduct = await Product.findOne({ name: productData.name });

            if (existingProduct) {
                // Update existing product
                await Product.findByIdAndUpdate(existingProduct._id, {
                    ...productData,
                    featured: true,
                    recommended: false
                });
                console.log(`🔄 Updated featured product: ${productData.name}`);
            } else {
                // Create new product
                const newProduct = new Product({ ...productData, featured: true, recommended: false });
                await newProduct.save();
                console.log(`✅ Created new featured product: ${productData.name}`);
            }
        }

        // Update or create recommended products
        for (const productData of recommendedProducts) {
            const existingProduct = await Product.findOne({ name: productData.name });

            if (existingProduct) {
                // Update existing product
                await Product.findByIdAndUpdate(existingProduct._id, {
                    ...productData,
                    featured: false,
                    recommended: true
                });
                console.log(`🔄 Updated recommended product: ${productData.name}`);
            } else {
                // Create new product
                const newProduct = new Product({ ...productData, featured: false, recommended: true });
                await newProduct.save();
                console.log(`✅ Created new recommended product: ${productData.name}`);
            }
        }

        console.log('✅ Homepage products updated successfully!');
        console.log(`📊 Total featured products: ${featuredProducts.length}`);
        console.log(`📊 Total recommended products: ${recommendedProducts.length}`);

        // Display summary
        const totalFeatured = await Product.countDocuments({ featured: true });
        const totalRecommended = await Product.countDocuments({ recommended: true });
        const totalActive = await Product.countDocuments({ isActive: true });

        console.log('\n📈 Database Summary:');
        console.log(`   Featured products: ${totalFeatured}`);
        console.log(`   Recommended products: ${totalRecommended}`);
        console.log(`   Total active products: ${totalActive}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating homepage:', error);
        process.exit(1);
    }
}

updateHomepage();

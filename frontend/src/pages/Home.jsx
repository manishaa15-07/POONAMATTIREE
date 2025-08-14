import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselImages = [
    { src: 'https://img.perniaspopupshop.com/HOMEPAGE_IMAGES/WOMEN/20_Jun_25/Website-01-Women-Shararas-Ghararas-20-0625.gif', caption: 'Elegant Summer Collection' },
    { src: 'https://byshree.com/cdn/shop/articles/Trendy-Ethnic-Sets-Exploring-the-Latest-Ethnic-Wear-Online.jpg?v=1701161326&width=2048', caption: 'Trendy Casual Wear' },
    { src: 'https://popinfash.com/content/images/2021/09/9_20210908_134407_0008.jpg', caption: 'Party Gowns & More' },
    { src: 'https://wforwoman.com/cdn/shop/files/W_website_banner_MF_24_copy-29_53324f41-d865-4230-88e4-aa2e6350395f.jpg?v=1726572485&width=1500', caption: 'Chic Bottoms & Accessories' },
];

const featuredProducts = [
    { id: 1, name: 'Summer Collection Dress', price: 1299, image: 'https://juniperfashion.com/cdn/shop/files/DSC_8493.jpg?v=1744781101&width=1000' },
    { id: 2, name: 'Casual Wear Set', price: 999, image: 'https://juniperfashion.com/cdn/shop/files/P1029D_MINT_5.jpg?v=1743491042&width=1000' },
    { id: 3, name: 'Party Wear Gown', price: 2499, image: 'https://www.aachho.com/cdn/shop/files/2_6d7d8016-9b61-4614-949c-e588c7f19dbd_720x.jpg?v=1748678089' },
];

const categories = [
    { name: 'Dresses', image: 'https://5.imimg.com/data5/SELLER/Default/2023/4/298081329/GT/CK/TD/148854516/ladies-party-wear-gown-500x500.jpeg' },
    { name: 'Kurtis', image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_400,h_514/https://kurtifashion.com/wp-content/uploads/2023/02/Cotton-Long-Kurti-Set-1-sd2fss2-400x514.jpg' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1602810315683-4ec2fd26fa3a?w=800' },
    { name: 'CropTop', image: 'https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-purple-printed-semicrepe-designer-readymadelehenga-gcfe0040766_purple_1_6_large.jpg?v=1729595563' },
    { name: 'Suit Sets', image: 'https://www.koskii.com/cdn/shop/files/Tile-Baner-Ready-Made-Sets.jpg?v=1750066613&width=720' },
    { name: 'Dress Materials', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqR-cjw4JBd0RhsYXm0FXbg45S0U_YWYm8g&s' },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Carousel Section */}
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                {carouselImages.map((item, index) => (
                    <div key={index}>
                        <img src={item.src} alt={item.caption} className="h-98 object-cover" />
                        <p className="legend">{item.caption}</p>
                    </div>
                ))}
            </Carousel>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-orange-400 text-white text-center py-16">
                <h1 className="text-4xl font-bold sm:text-5xl">Poonam Ladies Wear</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg">
                    Discover the finest ethnic and western wear, handpicked for every occasion.
                </p>
                <Link
                    to="/shop"
                    className="mt-6 inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200"
                >
                    Shop Now
                </Link>
            </div>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                            <img src={product.image} alt={product.name} className="h-74 w-full object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-primary font-bold">₹{product.price}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="mt-2 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80 transition"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map((cat, index) => (
                        <Link key={index} to={`/category/${cat.name}`} className="text-center">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-72 w-full object-cover rounded-lg shadow"
                            />
                            <p className="mt-2 text-sm font-medium">{cat.name}</p>
                        </Link>
                    ))}
                </div>
            </section>



            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6">Recommended</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map((cat, index) => (
                        <Link key={index} to={`/category/${cat.name}`} className="text-center">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-72 w-full object-cover rounded-lg shadow"
                            />
                            <p className="mt-2 text-sm font-medium">{cat.name}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

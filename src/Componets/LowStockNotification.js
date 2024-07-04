import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LowStockNotification = () => {
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/products/lowStock');
                setLowStockProducts(res.data);
            } catch (error) {
                console.error('Error fetching low stock products:', error);
            }
        };

        fetchLowStockProducts();
    }, []);

    return (
        <div>
            {lowStockProducts.length > 0 && (
                <div className="notification">
                    <h3>Low Stock Products</h3>
                    <ul>
                        {lowStockProducts.map((product) => (
                            <li key={product._id}>
                                {product.name} - Only {product.quantity} left in stock!
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LowStockNotification;

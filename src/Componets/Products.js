import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Products = () => {
    const [data, setData] = useState([])
    const [lowStockProducts, setLowStockProducts] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        DisplayData()

    }, [])
    const DisplayData = async () => {
        const res = await axios.get('http://localhost:5000/products/getProduct')
        setData(res.data)
        console.log('res=', res);
        console.log('res.data=', res.data);
    }

    const addCartEvent = async (productId) => {
        console.log('productId=', productId);
        const token = localStorage.getItem('token');
        console.log("token", token);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await axios.post('http://localhost:5000/Order/AddCart', {
            productId,
            // userId
        }, config)
        console.log('Add to cart response:', res.data);
        console.log('Add to cart response:', res.data);
        // seTotalQuantity(res.data.totalQuantity)

    }
    const ShowCartEvent = async () => {
        navigate('/Cart')

    }

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
        <>
            <div className='container'>
                {/* {console.log("totalQuantity=",totalQuantity)} */}
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
                <div className='justify-content-end d-flex p-5' onClick={() => { ShowCartEvent() }}>
                    Cart <FaCartArrowDown />
                </div>
                <table className='table table-bordered'>
                    <tr>
                        <th>index</th>
                        <th>name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>cart</th>

                    </tr>
                    {data?.map((product, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>

                            <td>
                                <button onClick={() => { addCartEvent(product._id) }}>
                                    Add Cart
                                </button>
                            </td>
                        </tr>
                    )
                    )}
                </table>
            </div>

        </>
    )
}
export default Products

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ShowCart = () => {
    const [cartData, setCartData] = useState(null)
    const [totalQuantity, seTotalQuantity] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        displayData();
    }, [])
    const token = localStorage.getItem('token');
    console.log("token", token);
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const displayData = async () => {
        const res = await axios.get('http://localhost:5000/Order/ShowCart', config)
        console.log('res?.data?.cart?.items=', res?.data?.cart?.items);
        console.log('res?.data?.cart=', res?.data?.cart?.totalQuantity);
        seTotalQuantity(res?.data?.cart?.totalQuantity)
        setCartData(res?.data?.cart?.items)
        calculateTotalAmount(res?.data?.cart?.items);
    }


    const calculateTotalAmount = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.productId.price * item.quantity;
        });
        setTotalAmount(total);
    };
    const calculateTotalQuantity = (items) => {
        let totalQty = 0;
        items.forEach(item => {
            totalQty += item.quantity;
        });
        seTotalQuantity(totalQty);
    };
    return (
        <>
            <div className='container'>

                <div>ShowCart</div>
                total quantity= {totalQuantity}

                {
                    cartData?.map((prr, i) => {
                        console.log(prr.productId.price,"prr.productId.price")
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{prr.productId.name}</h5>

                                    <h6 className="card-subtitle mb-2 text-muted">{prr.quantity}</h6>
                                    <h6> total price = {prr.productId.price * prr.quantity} </h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                </div>
                            </div>

                        )
                    })
                }
             <div>
                    <h5>Total Amount: {totalAmount}</h5>
                </div>
            </div>


        </>


    )
}

export default ShowCart
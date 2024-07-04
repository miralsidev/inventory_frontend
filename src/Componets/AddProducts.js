import React from 'react'
import { Field, Form, Formik } from 'formik'
import { TextField } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify';
const AddProducts = () => {
    const hasFormSubmit = async (values, { resetForm }) => {
        console.log('values==', values);
        const res = await axios.post('http://localhost:5000/products/addProduct', {
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: values.quantity
        })
        const data = res.data;
        console.log('data=', data);
        if (data.status === 200) {
            toast.success(data.message)
            resetForm()
        }
        else if (data.status === 400) {
            toast.error(data.message)
        }
        else if (data.status === 500) {
            toast.error(data.message)
        }
    }
    return (
        <>
            <Formik onSubmit={hasFormSubmit} initialValues={{
                name: '',
                description: '',
                price: '',
                quantity: ''
            }}>
                <div className='row justify-content-center'>

                    <div className='col-6'>
                        <Form>
                            <div style={{ display: 'flex', flexDirection: 'column' }} className='gap-3 p-3'>
                                <h1>Add Products</h1>
                                <Field as={TextField} name='name' label='enter the products name'></Field>
                                <Field as={TextField} name='description' label='enter the description'></Field>

                                <Field as={TextField} name='price' label='enter the price'></Field>

                                <Field as={TextField} name='quantity' label='enter the quantity'></Field>
                                <button type="submit" class="btn btn-success">Success</button>
                            </div>


                        </Form>
                    </div>
                </div>
            </Formik>
        </>
    )
}

export default AddProducts

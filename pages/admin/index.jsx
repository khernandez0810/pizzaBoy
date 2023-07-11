import React, { useState } from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image';
import axios from 'axios';
const admin = ({products, orders}) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "En Route", "Delivered"]

const handleDelete = async (id) => {
    try {
        const res = await axios.delete("https://pizza-boy.vercel.app/api/products/" + id);
        setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    } catch (error) {
        console.log(error)
    }
};

const handleStatus = async (id) => {

    const item = orderList.filter(order => order._id === id )[0]
    const currentStatus = item.status

    try {
        const res = await axios.put("https://pizza-boy.vercel.app/api/orders/" + id, {status: currentStatus + 1 });
        setOrderList([
            res.data,
            ...orderList.filter((order) => order._id !== id)
        ])
    } catch (error) {
        console.log(error)
    }
}



  return (
    <div className={styles.container}>
        <div className={styles.item}>
<h1 className={styles.title}>Products</h1>
<table className={styles.table}>
    <tbody>
        <tr className={styles.trTitle}>
            <th>Image</th>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>

        </tr>
    </tbody>
    {pizzaList.map((product) => (
        <tbody key={product._id}>
        <tr className={styles.trTitle}>
        <td>
            <Image src={product.img}
            width={50}
            height={50}
            obbjectFit='cover'
            alt='' />
        </td>
        <td>{product._id.slice(0,5)}...</td>
        <td>{product.title}</td>
        <td>${product.prices[0]}</td>
        <td>
            <button className={styles.button}>edit</button>
            <button onClick={() => handleDelete(product._id)} className={styles.button}>delete</button>
        </td>

    </tr>
    </tbody>
  ))}
</table>
            </div>
            <div className={styles.item}>
<h1 className={styles.title}>Orders</h1>
<table className={styles.table}>
    <tbody>
        <tr className={styles.trTitle}>
            <th>Order Id</th>
            <th>Customer</th>
            <th>Order total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>

        </tr>
    </tbody>
    {orderList.map((order => (

    <tbody key= {order._id}>
        <tr className={styles.trTitle}>
            <td>
            {order._id.slice(0,5)}...
            </td>
            <td>{order.customer}</td>
            <td>${order.total}</td>
            <td>{order.method === 0 ? (<span>cash</span>) : (<span>paid</span>)}</td>
            <td>{status[order.status]}</td>
            <td>
                <button onClick = {() => handleStatus(order._id)}>next stage</button>
            </td>

        </tr>
    </tbody>
 )))}
</table>
            </div>
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token !== process.env.TOKEN) {
        return{
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }
    const productRes = await axios.get('https://pizza-boy.vercel.app/api/products')
    const orderRes = await axios.get('https://pizza-boy.vercel.app/api/orders')


    return {
        props:{ 
            orders: orderRes.data,
            products: productRes.data
        }}
}
export default admin
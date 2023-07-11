import React from 'react'
import styles from "../styles/OrderDetails.module.css"
import {useState} from "react"
const OrderDetails = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] =useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const handleClick = () => {
        createOrder({
            customer, address, phoneNumber, total, method:0
        })
    }


  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Your total will be $14 after delivery</h1>
            <div className = {styles.item}>
                <label className={styles.label}>Name</label>
                <input placeholder='John smith' type="text" className={styles.input} onChange={(e) => setCustomer(e.target.value)}/>
            </div>
            <div className = {styles.item}>
                <label className={styles.label}>Address</label>
                <input placeholder='730 simms st' type="text" className={styles.input} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className = {styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input placeholder='4077777777' type="text" className={styles.input} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>
            <button className={styles.button} onClick={handleClick}>Confirm Order</button>
        </div>
        
    </div>
  )
}

export default OrderDetails
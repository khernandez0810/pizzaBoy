import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Order.module.css'
import axios from 'axios';

const Order = ({ order }) => {
console.log(order)
const status = order.status;

const statusClass = (index) => {
    if(index-status < 1) return styles.done
    if(index-status === 1) return styles.inProgress
    if(index-status > 1) return styles.incomplete
}


  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
            <table className={styles.table}>
                <tbody>
                <tr className={styles.trTitle}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                </tr>
                <tr className={styles.tr}>
                    <td>
                        <span className={styles.id}>{order._id}</span>
                    </td>
                    <td>
                        <span className={styles.name}>
                           {order.customer}
                        </span>
                    </td>
                    <td>
                        <span className={styles.address}>{order.address}</span>
                        </td>
                    <td><span className={styles.total}>${order.total}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className={styles.row}>
                <div className={statusClass(0)}>
                    <Image alt='' src='/img/paid.png' width={30} height={30} />
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image src='/img/checked.png' width={20} height={20} />
                    </div>
                </div>
                <div className={statusClass(1)}>
                    <Image alt='' src='/img/bake.png' width={30} height={30} />
                    <span>Preparing</span>
                    <div className={styles.checkedIcon}>
                        <Image src='/img/checked.png' width={20} height={20} />
                    </div>
                </div>
                <div className={statusClass(2)}>
                    <Image alt='' src='/img/bike.png' width={30} height={30} />
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image src='/img/checked.png' width={20} height={20} />
                    </div>
                </div>
                <div className={statusClass(3)}>
                    <Image alt='' src='/img/delivered.png' width={30} height={30} />
                    <span>Complete</span>
                    <div className={styles.checkedIcon}>
                        <Image src='/img/checked.png' width={20} height={20} />
                    </div>
                </div>
                </div>
        </div>
        <div className={styles.right}>
        <div className={styles.wrapper}>
        <h2 className={styles.title}>Cart Total</h2>
        <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
        </div>
        <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Discount:</b>$0.00
        </div>
        <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Total:</b>${order.total}
        </div>
        <button disabled className={styles.button}>Paid</button>
        </div>
        </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
    const response = await fetch(`https://pizza-boy.vercel.app/api/orders/${params.id}`);
    const order = await response.json();
    
    return {
      props: {
        order: order
      }
    };
  }

export default Order;
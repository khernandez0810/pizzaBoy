import React from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
const Product = ( {pizza} ) => {

    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex) => {
            const diff = pizza.prices[sizeIndex] - pizza.prices[size];
            setSize(sizeIndex);
            changePrice(diff)
    }
    const handleChange = (e, options) => {
        const checked = e.target.checked;

        if(checked) {
           changePrice(options.price)
           setExtras(prev => [...prev,options])
        } else {
            changePrice(-options.price)
            setExtras(extras.filter(extra =>extra._id !== options._id))
        }
    }

    const handleClick=() => {
        dispatch(addProduct({...pizza, extras, price, quantity}))
    }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image alt='' src={pizza.img} layout='fill' objectFit='contain'/>
            </div>
        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>${price}</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}> Choose your size</h3>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={() => handleSize(0)}>
                    <Image alt='' src='/img/size.png' layout='fill' />
                    <span className={styles.number}>Small</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(1)}>
                    <Image alt='' src='/img/size.png' layout='fill' />
                    <span className={styles.number}>Medium</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(2)}>
                    <Image alt='' src='/img/size.png' layout='fill' />
                    <span className={styles.number}>Large</span>
                </div>
            </div>
            <h3 className={styles.choose}> Choose additional ingredients</h3>
            <div className={styles.ingredients}>
                {pizza.extraOptions.map((options) => (
                <div className={styles.option} key={options._id}>
                    <input type='checkbox' onChange={(e) =>handleChange(e,options) } id={options.text} name={options.text} className={styles.checkbox}/>
                    <label htmlFor={options.text}>{options.text}</label>
                </div>
                 ))}
            </div>
            <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Add to Order</button>
                </div>
        </div>
    </div>
  )
}

export async function getServerSideProps({params}) {
    const response = await fetch(`https://pizza-boy.vercel.app/api/products/${params.id}`);
    const pizza = await response.json();
    return {
      props: {
        pizza,
      },
    };
  }


export default Product;
import React from 'react'
import Image from 'next/image'
import styles from "../styles/Features.module.css"
import {useEffect, useState} from 'react'
const Features = () => {
    const [index, setIndex] = useState(0)
    const images = [
        "/img/featured1.jpg",
        "/img/featured2.jpg",
        "/img/featured3.jpg",
    ];

    const handleArrow = (direction) => {
        if (direction === "l"){
            setIndex(index !==0 ? index-1 : 2)
        }
        if (direction === "r"){
            setIndex(index !==2 ? index+1 : 0)
        }
        console.log(index)
    }

    useEffect(() => {
        const switchImage = () => {
            setIndex((prevIndex) => (prevIndex !== images.length -1 ? prevIndex + 1 : 0));
        };

        const timer = setInterval(switchImage, 3000);

        return () => clearInterval(timer);
    }, []);





  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{ left:0 }} onClick={() => handleArrow('l')}>
        <Image src='/img/arrowl.png' alt='' layout="fill" objectFit='contain'/>
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                    <Image src={img} alt='' layout='fill' objectFit='contain' />
                    </div>
                ))}
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={() => handleArrow('r')}>
        <Image src='/img/arrowr.png' alt='' layout="fill" objectFit='contain'/>
        </div>
    </div>
  )
}

export default Features
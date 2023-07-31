import React from 'react'
import styles from "../styles/PizzaList.module.css"
import PizzaCard from './PizzaCard'
const PizzaList = ({ pizzaList }) => {
  console.log(pizzaList)
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>The Freshest Pizzas in Town!</h1>
        <p className={styles.desc}>
        Our pizzas are made with only the best and freshest local ingredients. We take pride in the quality of our pizzas.
        </p>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza) => (
                 <PizzaCard key={pizza._id} pizza={pizza}/>
          ))}


        </div>
    </div>
  )
}

export default PizzaList
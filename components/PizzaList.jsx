import React from 'react'
import styles from "../styles/PizzaList.module.css"
import PizzaCard from './PizzaCard'
const PizzaList = ({ pizzaList }) => {
  console.log(pizzaList)
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>TITLE</h1>
        <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur orci sed facilisis feugiat. Nullam mollis facilisis leo sit amet congue. Cras pellentesque scelerisque urna, sit amet dictum massa posuere eget. Proin odio enim, sollicitudin sit amet fermentum sit amet, rutrum vel turpis. Donec viverra, arcu non tincidunt semper, metus nisl tincidunt nisi, at consequat sapien arcu sed justo. Mauris a ligula varius, tincidunt dui eu, porta arcu. Proin sit amet ultricies ex
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
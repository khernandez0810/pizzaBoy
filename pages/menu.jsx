
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PizzaList from '@/components/PizzaList'
import {  useState } from 'react';
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })
import Add from '@/components/Add'
import AddButton from '@/components/AddButton'



export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true)


  return (
    <div className={styles.container}>
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN) {
    admin = true
  }

  const res = await axios.get("https://pizza-boy.vercel.app/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin
    },
  };
}


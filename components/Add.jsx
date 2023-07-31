import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Add.module.css";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);


const handleExtraInput = (e) => {
    setExtra({...extra, [e.target.name]: e.target.value});
};

const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
}


const changePrices = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices)
}

const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dhyjum960/image/upload", data)
      const { url } = uploadRes.data;
    const newProduct = {
      title, desc, prices, extraOptions, img: url
    };
    await axios.post("http://localhost:3000/api/products", newProduct)
    setClose(true);
  
  } 
    catch (error) {
      console.log(error)
    }
}

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}> Choose image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}> Choose Pizza Name</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}> Choose description</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}> Prices</label>
          <div className={styles.priceContainer}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Small"
            onChange={(e) => changePrices(e, 0)}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Medium"
            onChange={(e) => changePrices(e, 1)}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Large"
            onChange={(e) => changePrices(e, 2)}
          />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extras</label>
          <div className={styles.extra}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="text"
            placeholder="items"
            name="text"
            onChange={handleExtraInput}
          />
           <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="price"
            name="price"
            onChange={handleExtraInput}
          />
          <button className={styles.extraButton} onClick={handleExtra}>
            Add
          </button>
          </div>
        </div>
        <div className={styles.extraItems}>
        {extraOptions.map((option) => (
            <span className={styles.extraItem} key={option.text}>{option.text}</span>
        ))}
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
            Add New Pizza
        </button>
      </div>
    </div>
  );
};

export default Add;

import React, { useState } from 'react'
import styles from "../../styles/Login.module.css"
import { useRouter } from 'next/router'
import axios from 'axios'
const login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
            try {
                await axios.post("https://pizza-boy.vercel.app/api/login", {username, password})
                router.push('/admin')
            } catch (error) {
                console.log(error);
                setError(true)
            }
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>
                Admin Dashboard
            </h1>
            <input placeholder='username' className={styles.input} onChange ={(e) => setUsername(e.target.value)}/>
            <input placeholder='password' className={styles.input} onChange ={(e) => setPassword(e.target.value)}/>
            <button onClick={handleClick} className={styles.button}>
            Sign In
            </button>
            {error && <span className={styles.error}>Wrong Username or Password</span>}
        </div>
    </div>
  )
}

export default login
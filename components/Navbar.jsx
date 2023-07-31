import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const router = useRouter();
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button className={styles.toggleMenu} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER</div>
          <div className={styles.text}>407-745-9097</div>
        </div>
        <div className={styles.mobilePageTitle}>Pizza Boy</div>
      </div>
      <div className={styles.item}>
        <ul className={`${styles.list} ${showMenu ? styles.show : ""}`}>
          <Link href="/" passHref>
            <li
              className={
                router.pathname === "/" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Home
            </li>
          </Link>
          <Link href="/menu" passHref>
            <li
              className={
                router.pathname === "/menu" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Menu
            </li>
          </Link>
          <div className={styles.pageTitle}>Pizza Boy</div>
          <Link href="/events" passHref>
            <li
              className={
                router.pathname === "/events" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Events
            </li>
          </Link>
          <Link href="/contact" passHref>
            <li
              className={
                router.pathname === "/contact" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Contact
            </li>
          </Link>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

"use strict";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useEffect } from "react";

import { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      
    }
  });
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav__container}>
        <Link href="/" className={styles.nav__logo}>
          FaShop
        </Link>
        <ul
          className={
            click ? `${styles.nav__menu} ${styles.active}` : styles.nav__menu
          }
        >
          <li className={styles.nav__item}>
            <Link
              href="/"
              
              className={styles.nav__links}
              onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/about"
              className={styles.nav__links}
              onClick={handleClick}
            >
              About
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/product"
              className={styles.nav__links}
              onClick={handleClick}
            >
              Product
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/cart"
              className={styles.nav__links}
              onClick={handleClick}
            >
              Cart
            </Link>
          </li>
        </ul>

        <div className={styles.nav__icon} onClick={handleClick}>
          {click ? <FaTimesCircle /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

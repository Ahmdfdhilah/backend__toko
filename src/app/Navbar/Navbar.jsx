"use strict";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import React, { useEffect } from "react";

import { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [numbers, setNumbers] = useState(0);
  const handleClick = () => setClick(!click);
 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      const numbers = data.map((x) => x.jumlah).reduce((x, y) => x + y, 0);
      setNumbers(parseInt(numbers));
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
              activeClassName={styles.active}
              className={styles.nav__links}
              onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/about"
              activeClassName={styles.active}
              className={styles.nav__links}
              onClick={handleClick}
            >
              About
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              href="/product"
              activeClassName={styles.active}
              className={styles.nav__links}
              onClick={handleClick}
            >
              Product
            </Link>
          </li>
          <li>
        
              <Link href="/cart" class={styles.nav__item}>
                <div class={styles.cart__container}>
                  <GiShoppingCart color="white" size={30}/>
                  <div class={styles.number__order}>{numbers}</div>
                </div>
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

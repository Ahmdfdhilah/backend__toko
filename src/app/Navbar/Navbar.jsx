"use strict";
import styles from "./styles.module.css";
import Link from "next/link";
import { AiOutlineHome} from "react-icons/ai";
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
       Home
        </Link>
        {/* <div className={styles.nav__icon} onClick={handleClick}>
          {click ? <FaTimesCircle /> : <GiHamburgerMenu />}
        </div> */}
      </div>
    </nav>
  );
};
export default Navbar;

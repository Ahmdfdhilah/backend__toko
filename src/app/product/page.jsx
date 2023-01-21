"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {AiOutlineShoppingCart } from "react-icons/ai";

const Product = () => {
  const [dataResult, setDataResult] = useState([]);
  const basket = JSON.parse(localStorage.getItem("data")) || [];

  useEffect(() => {
    async function getData() {
      try {
        const url = "http://localhost:3000/api/server";
        const response = await fetch(url);
        const res = await response.json();
        setDataResult(res.results);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  function updates() {
    const numbers = basket.map((x) => x.jumlah).reduce((x, y) => x + y, 0);
    const sum = {
      jumlah: numbers,
    };
    localStorage.setItem("jumlah", JSON.stringify(sum));
  }
  return (
    <div className={styles.container}>
      {dataResult.map((x) => {
        return (
          <div className={styles.card}>
            <div className={styles.card__image}>
              <img src={`/${x.img}`}/>
            </div>
            <div className={styles.card__content}>
              <div className={styles.card__content__tag}>
                <span className={styles.tag}>{x.id}</span>
              </div>
              <p className={styles.card__content__title}>{x.name}</p>
              <p className={styles.card__content__info}>
                {x.desc}
                Sed aliquyam elitr dolore erat consetetur est clita at laoreet
                est iriure clita. Placerat amet eleifend lorem ea facilisi et
                erat sed amet sed tincidunt ipsum feugiat duis et consetetur
                ipsum lorem. Diam lobortis stet lorem invidunt duis amet et
                sadipscing nonumy invidunt. Justo stet est tation suscipit eos
                sit et enim ipsum et dolor suscipit.
              </p>
              <div className={styles.card__content__config}>
                <div className={styles.price}>
                  <span className={styles.price}>Rp {x.harga}</span>
                  {/* <span className={styles.prev_price}>$350</span> */}
                </div>
                <div className={styles.colors}>
                  <span className={`${styles.color} ${styles.color1}`}></span>
                  <span className={`${styles.color} ${styles.color2}`}></span>
                  <span className={`${styles.color} ${styles.color3}`}></span>
                </div>
              </div>
              <div className={styles.card__content__action}>
                <button
                  className={styles.cart}
                  onClick={function () {
                    let status = basket.find((baskets) => baskets.id === x.id);

                    if (status === undefined) {
                      basket.push({
                        id: x.id,
                        jumlah: 1,
                        desc: x.desc,
                        img: x.img,
                        name: x.name,
                        harga: x.harga,
                      });
                    } else {
                      status.jumlah += 1;
                    }
                    localStorage.setItem("data", JSON.stringify(basket));
                    updates();
                  }}
                >
                  <AiOutlineShoppingCart/>Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
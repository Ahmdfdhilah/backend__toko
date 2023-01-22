"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import 'react-notifications/lib/notifications.css';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Product = () => {
  const initialStateTotal = JSON.parse(localStorage.getItem("totals"));
  const [dataResult, setDataResult] = useState([]);

  const [number, setNumber] = useState(initialStateTotal ? initialStateTotal.total : 0)
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
    const sum = basket.map((x) => x.total).reduce((x, y) => x + y, 0);
    setNumber(sum);
    localStorage.setItem("totals", JSON.stringify({
      total: sum
    }));
    NotificationManager.success('You have add this item to your cart', 'Success!');
  }

  return (
    <div className={styles.container}>
      {dataResult.map((x) => {
        return (
          <div className={styles.card}>
            <div className={styles.card__image}>
              <img src={`/${x.img}`} />
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
                  <span className={styles.price}>Rp {x.price}</span>
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
                        total: 1,
                        description: x.description,
                        img: x.img,
                        name: x.name,
                        price: x.price,
                      });
                    } else {
                      status.total += 1;
                    }
                    localStorage.setItem("data", JSON.stringify(basket));
                    updates();
                  }}
                >
                  <AiOutlineShoppingCart />Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.cart__sticky}>
        <div className={styles.cart__wrapper}>
          <Link href="/cart" className={styles.cart__button}>
            <BsCartFill color="white" size={40} />
            <div className={styles.number__order}>{number}</div>
          </Link>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Product;
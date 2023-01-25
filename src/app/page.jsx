"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSpring, animated, useSprings } from '@react-spring/web';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import styles from "./styles.module.css";

const Home = () => {
  const initialStateTotal = JSON.parse(localStorage.getItem("totals"));
  const [dataResult, setDataResult] = useState([]);
  const [number, setNumber] = useState(initialStateTotal ? initialStateTotal.total : 0)
  const [cart, setCart] = useState()
  const [activeIndex, setActiveIndex] = useState()
  const basket = JSON.parse(localStorage.getItem("data")) || [];
 
  useEffect(() => {
    async function getData() {
      try {
        const url = "/api/server";
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
  }
  const propButton = useSprings(dataResult.length, dataResult.map((data, index) => ({
    width: index === activeIndex ? 200 : 0
  })
  ))
  const propCartButton = useSpring({ width: cart ? 80 : 0 })

  return (
    <div className={styles.container}>
      {dataResult.map((x, index) => {
        return (
          <div className={styles.card}>
            <div className={styles.image__card}>
              <img src={x.img} alt="" />
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
                <div
                  className={styles.cart}
                  onClick={function () {
                    let status = basket.find((baskets) => baskets.id === x.id);

                    if (status === undefined) {
                      basket.push({
                        id: x.id,
                        number: x.number,
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
                ><div className={styles.container__button}>
                    <div className={styles.main__button} onMouseOver={() => setActiveIndex(index)} onMouseOut={() => setActiveIndex(-1)}>
                      <animated.div className={styles.fill__button} style={propButton[index]} />
                      <animated.div className={styles.content__button}><AiOutlineShoppingCart />Add to Cart</animated.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.cart__sticky}>
        <div div className={styles.main__button__cart}>
          <animated.div className={styles.fill__button__cart} style={propCartButton} />
          <animated.div className={styles.content__button__cart}>
            <Link href="/cart" className={styles.cart__button}  onMouseOver={() => setCart(true)} onMouseOut={() => setCart(false)}>
              <BsCartFill size={40} />
              <div className={styles.number__order}>{number}</div>
            </Link>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
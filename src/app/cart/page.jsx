"use client";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./styles.module.css";

const Cart = () => {
  const basket = JSON.parse(localStorage.getItem("data")) || [];
  const isCart = basket.length != 0 ? true : false;

  return (
    <div className={styles.container}>
      {isCart ? (
        basket.map((x) => {
          return (
            <div className={styles.card}>
              <div className={styles.card__image}>
                <img src={`/${x.img}`} />
              </div>
              <div className={styles.card__content}>
                <div className={styles.card__content__tag}>
                  <span className={styles.tag}>{x.id}</span>
                </div>
                <div className={styles.card__content__tag}>
                  <span className={styles.tag}>Quantities : {x.jumlah}</span>
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
                    <span className={styles.price}>Rp {x.harga*x.jumlah}</span>
                    {/* <span className={styles.prev_price}>$350</span> */}
                  </div>
                  <div className={styles.colors}>
                    <span className={`${styles.color} ${styles.color1}`}></span>
                    <span className={`${styles.color} ${styles.color2}`}></span>
                    <span className={`${styles.color} ${styles.color3}`}></span>
                  </div>
                </div>
                <div className={styles.card__content__action}>
                  <button className={styles.cart}>
                    <BsFillTrashFill />
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>heyyy</h2>
      )}
    </div>
  );
};

export default Cart;

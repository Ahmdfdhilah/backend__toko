"use client";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs"
import { to, animated, config, useSprings, useSpring } from "react-spring";
import { useDrag } from 'react-use-gesture';
import { scale, dist } from 'vec-la';
import Link from "next/link";

const Cart = () => {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [isCart, setIsCart] = useState(basket.length != 0 ? true : false);
  const [checkoutButton, setCheckoutButton] = useState(false);
  const [activeIndex, setActiveIndex] = useState()
  const [sum, setSum] = useState(basket.length != 0 ? basket.map((x) => x.total * x.price).reduce((x, y) => x + y, 0) : 0);
  const [emptyTextAnimated, setEmptyTextAnimated] = useState(false);

  useEffect(() => {
    setIsCart(basket.length != 0 ? true : false);
    setSum(basket.map((x) => x.total * x.price).reduce((x, y) => x + y, 0))
  }
    , [basket])
  const propCartButton = useSpring({ width: checkoutButton ? 200 : 0 })
  const propButton = useSprings(basket.length, basket.map((data, index) => ({
    width: index === activeIndex ? 200 : 0
  })
  ))

  const [{ pos }, api] = useSpring(() => ({ pos: [0, 0] }))
  const [{ angle }, angleApi] = useSpring(() => ({
    angle: 0,
    config: config.wobbly,
  }))
  const { x } = useSpring({
    from: { x: 0 },
    x: emptyTextAnimated ? 1 : 0,
    config: { duration: 1000 },
  })
  const bind = useDrag(
    ({ xy, previous, down, movement: pos, velocity, direction }) => {
      api.start({
        pos,
        immediate: down,
        config: { velocity: scale(direction, velocity), decay: true },
      })

      if (dist(xy, previous) > 10 || !down)
        angleApi.start({ angle: Math.atan2(direction[0], -direction[1]) })
    },
    { initial: () => pos.get() }
  )
  return (
    <div className={styles.container}>
      {
        <div className={styles.basket__container}>{
          basket.map((x, index) => {
            return (
              <div className={styles.card}
                data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-once="true"
                data-aos-offset="200">
                <div className={styles.card__image}>
                  <img src={`/${x.img}`} />
                </div>
                <div className={styles.card__content}>
                  <div className={styles.card__content__tag}>
                    <span className={styles.tag}>{x.id}</span>
                  </div>
                  <div className={styles.card__content__tag}>
                    <span className={styles.tag}>Quantities : {x.total}</span>
                  </div>
                  <p className={styles.card__content__title}>{x.name}</p>
                  <p className={styles.card__content__info}>
                    {x.description}
                    Sed aliquyam elitr dolore erat consetetur est clita at laoreet
                    est iriure clita. Placerat amet eleifend lorem ea facilisi et
                    erat sed amet sed tincidunt ipsum feugiat duis et consetetur
                    ipsum lorem. Diam lobortis stet lorem invidunt duis amet et
                    sadipscing nonumy invidunt. Justo stet est tation suscipit eos
                    sit et enim ipsum et dolor suscipit.
                  </p>
                  <div className={styles.card__content__config}>
                    <div className={styles.price}>
                      <span className={styles.price}>Rp {x.price * x.total}</span>
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
                        const temp = basket.filter(y => y.id != x.id);
                        const sum = temp.map((x) => x.total).reduce((x, y) => x + y, 0);

                        localStorage.setItem('data', JSON.stringify(temp));
                        localStorage.setItem("totals", JSON.stringify({
                          total: sum
                        }));
                        setBasket(temp)
                      }}
                    >
                      <div className={styles.container__button}>
                        <div className={styles.main__button} onMouseOver={() => setActiveIndex(index)} onMouseOut={() => setActiveIndex(-1)}>
                          <animated.div className={styles.fill__button} style={propButton[index]} />
                          <animated.div className={styles.content__button}><BsFillTrashFill />Removed from Cart</animated.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        }
        </div>
      }
      {
        isCart ? (
          <div
            className={styles.payment__container}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
            data-aos-offset="200">
            <div className={styles.cart__total}>Total : {sum}</div>
            <div className={styles.main__button__co} onMouseOver={() => setCheckoutButton(true)} onMouseOut={() => setCheckoutButton(false)}>
              <animated.div className={styles.fill__button__co} style={propCartButton} />
              <animated.div className={styles.content__button__co}><BsFillBagCheckFill />Checkout</animated.div>
            </div>
          </div>
        ) : (
          <div 
            className={styles.container__empty}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
            data-aos-offset="200">
            <animated.div
              onClick={() => setEmptyTextAnimated(!emptyTextAnimated)}
              className={styles.text}
              style={{
                scale: x.to({
                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                }),
              }}>
              Your Cart Is Still Empty
            </animated.div>
            <Link href={"/"} className={styles.main__button__co}>
              <animated.div className={styles.fill__button__back} style={propCartButton} />
              <animated.div className={styles.content__button__back} onMouseOver={() => setCheckoutButton(true)} onMouseOut={() => setCheckoutButton(false)}><BsFillBagCheckFill />Continue Shopping</animated.div>
            </Link>
            <animated.div
              className={styles.rocket}
              {...bind()}
              style={{
                transform: to(
                  [pos, angle],
                  ([x, y], a) => `translate3d(${x}px,${y}px,0) rotate(${a}rad)`
                ),
              }}
            />
          </div>

        )
      }
    </div>
  );
};

export default Cart;
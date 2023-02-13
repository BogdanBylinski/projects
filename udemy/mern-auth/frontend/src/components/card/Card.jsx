import React from "react";
import styles from "./Card.module.scss";
import { ReactComponent as Logo } from "../../assets/login.svg";
function Card({ children, cardClass }) {
  return <div className={`${styles.card} ${cardClass} `}>{children}</div>;
}

export default Card;

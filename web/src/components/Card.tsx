import {BaseHTMLAttributes} from "react";

import styles from "./Card.module.css";

const Card = ({className, ...props}: BaseHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.Card + " " + className} {...props}>
    </div>
  )
}

export default Card;
import type { FC } from "react";
import styles from "./Loader.module.css";

export const Loader: FC = () => {
  return (
    <div>
      <h2>Loading...</h2>
      <span className={styles.loader}></span>
    </div>
  );
};

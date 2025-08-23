"use client";

import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button className={styles.button} disabled={loading || props.disabled} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

"use client";

import React, { forwardRef, useId } from "react";
import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          id={inputId}
          ref={ref}
          className={[styles.input, error ? styles.invalid : "", className ?? ""].join(" ").trim()}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

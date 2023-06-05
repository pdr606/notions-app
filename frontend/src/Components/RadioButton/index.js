import React from "react";
import styles from "./index.module.css";

const RadioButton = ({ options, value, setValue, ...props }) => {
  return (
    <div className={styles.divContainer}>
      {options.map((option) => (
        <label className={styles.Options} key={option}>
          <input
            className={styles.OptionsRadio}
            type="radio"
            required
            checked={value === option}
            value={option}
            onChange={({ target }) => setValue(target.value)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;

import styles from "./example.module.css";

export const Example1 = () => {
  return (
    <img
      src="/TonMaskExample.png"
      className={styles.exampleImage}
      style={{
        margin: "20px 0 20px 20px",
        float: "right",
      }}
    />
  );
};

export const Example2 = () => {
  return (
    <img
      src="/TonMaskExample2.png"
      className={styles.exampleImage}
      style={{
        margin: "0 40px 20px 0",
        float: "left",
      }}
    />
  );
};

export const Example3 = () => {
  return (
    <img
      src="/TonMaskExample2.png"
      className={styles.exampleImage}
      style={{
        margin: "50px 0 20px 20px",
        float: "right",
      }}
    />
  );
};

export const Example4 = () => {
  return (
    <img
      src="/TonMaskExample3.png"
      className={styles.exampleImage}
      style={{
        margin: "20px 0 20px 20px",
        float: "right",
      }}
    />
  );
};

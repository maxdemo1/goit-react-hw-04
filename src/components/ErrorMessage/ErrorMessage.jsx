import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.errorContainer}>
      An error occurred, please try again later.
    </div>
  );
};

export default ErrorMessage;

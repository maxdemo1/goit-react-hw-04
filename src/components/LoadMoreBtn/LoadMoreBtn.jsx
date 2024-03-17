import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;

import styles from "./NoResults.module.css";

const NoResults = () => {
  return (
    <div className={styles.noResults}>
      Unfortunately, we do not have a decent picture for your search query🙃
      <br />
      Please try to find something else.
    </div>
  );
};

export default NoResults;

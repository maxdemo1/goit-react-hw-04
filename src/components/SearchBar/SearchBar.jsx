import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

import styles from "./SearchBar.module.css";

const SearchBar = ({ searchByKeyword, resetPage }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const searchQuery = evt.target.elements.searchQuery.value.trim();
    if (searchQuery === "") {
      toast.error("Please enter your request", {
        position: "top-right",
        reverseOrder: false,
        duration: 1000,
      });

      return;
    }

    resetPage(1);
    searchByKeyword(searchQuery);
    evt.target.elements.searchQuery.value = "";
  };

  return (
    <header>
      <Toaster />
      <form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
        <div className={styles.inputContainer}>
          <CiSearch className={styles.searchSVG} />
          <input
            className={styles.searchInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={styles.submitBtn} type="submit"></button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;

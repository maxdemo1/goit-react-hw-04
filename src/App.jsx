import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import { requestForImage } from "./services/api";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import NoResults from "./components/NoResults/NoResults";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState([]);
  const [showError, setShowError] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [openModalState, setOpenModalState] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMoreShow, setLoadMoreShow] = useState(false);
  const openModalFromImage = (imageData) => {
    setDataModal(imageData);
    setOpenModalState(true);
  };

  const modalClose = () => {
    setDataModal(null);
    setOpenModalState(false);
  };

  const loadMore = () => {
    setPage((prevState) => (prevState += 1));
  };

  function searchFormSubmit(userSearchQuery) {
    setPage(1);
    setUserQuery(userSearchQuery);
    setNoResults(false);
    setShowError(false);
    setShowList([]);
  }

  useEffect(() => {
    if (userQuery !== "") {
      (() => {
        async function searchByUserQuery() {
          try {
            setLoading(true);
            setShowError(false);
            const responseData = await requestForImage(userQuery, page);
            if (responseData.total === 0) {
              setNoResults(true);
            }
            if (responseData.total_pages > page) {
              setLoadMoreShow(true);
            } else setLoadMoreShow(false);

            setShowList((prevState) => {
              return [...prevState, ...responseData.results];
            });
          } catch (error) {
            setShowError(true);
          } finally {
            setLoading(false);
          }
        }
        searchByUserQuery();
      })();
    } else return;
  }, [page, userQuery]);

  return (
    <>
      <SearchBar searchByKeyword={searchFormSubmit} resetPage={setPage} />
      {showError && <ErrorMessage />}
      {showList.length > 0 && (
        <ImageGallery
          itemsList={showList}
          handleOpenModal={openModalFromImage}
        />
      )}
      {noResults && <NoResults />}

      {openModalState && (
        <ImageModal
          dataModal={dataModal}
          openState={openModalState}
          modalClose={modalClose}
        />
      )}
      {loading && <Loader />}
      {loadMoreShow && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
};
export default App;

import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import { requestMoreImage, requestForImage } from "./services/api";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import NoResults from "./components/NoResults/NoResults";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userQuery, setUserQuery] = useState([""]);
  const [noResults, setNoResults] = useState(false);
  const [dataModal, setDataModal] = useState([false, null]);
  const [page, setPage] = useState(1);
  const [loadMoreShow, setLoadMoreShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  async function seacrhFormSubmit(userSearchQuery) {
    try {
      setPage(1);
      setTotalPages(0);
      setUserQuery(userSearchQuery);
      setLoading(true);
      setShowList([]);
      setShowError(false);
      setNoResults(false);
      const responseData = await requestForImage(userSearchQuery);
      if (responseData.total === 0) {
        setNoResults(true);
      }
      if (responseData.total_pages > 1) {
        setTotalPages(responseData.total_pages);
        setLoadMoreShow(true);
      }
      setShowList(responseData.results);
    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  const openModalFromImage = (imageData) => {
    setDataModal([true, imageData]);
  };

  const modalClose = () => {
    setDataModal([false, null]);
  };

  const loadMore = () => {
    setPage((prevState) => (prevState += 1));
  };

  useEffect(() => {
    if (page === 1) return;
    async function loadMoreImages() {
      try {
        setLoading(true);
        setShowError(false);
        const newImageData = await requestMoreImage(userQuery, page);
        setShowList((prevState) => {
          return [...prevState, ...newImageData.results];
        });
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 400);
      } catch (error) {
        setShowError(true);
      } finally {
        setLoading(false);
      }
    }
    loadMoreImages();
  }, [page]);

  useEffect(() => {
    if (page === totalPages) {
      setLoadMoreShow(false);
    }
  }, [page]);

  return (
    <>
      <SearchBar seacrhFormSubmit={seacrhFormSubmit} />
      {showError && <ErrorMessage />}
      {showList.length > 0 && (
        <ImageGallery
          itemsList={showList}
          handleOpenModal={openModalFromImage}
        />
      )}
      {noResults && <NoResults />}

      {dataModal[0] && (
        <ImageModal dataModal={dataModal} modalClose={modalClose} />
      )}
      {loading && <Loader />}
      {loadMoreShow && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
};
export default App;

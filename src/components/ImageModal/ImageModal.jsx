import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ dataModal, openState, modalClose }) => {
  return (
    <div>
      <ReactModal
        isOpen={openState}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          modalClose();
        }}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <img
          src={dataModal.urls.full}
          alt={dataModal.description}
          className={styles.modalImage}
        />
      </ReactModal>
    </div>
  );
};

export default ImageModal;

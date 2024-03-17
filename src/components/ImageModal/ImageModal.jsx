import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ dataModal, modalClose }) => {
  const [openState, imageData] = dataModal;

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
          src={imageData.urls.full}
          alt={imageData.description}
          className={styles.modalImage}
        />
      </ReactModal>
    </div>
  );
};

export default ImageModal;

import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ itemsList, handleOpenModal }) => {
  return (
    <ul className={styles.imagesList}>
      {itemsList.map((item) => {
        return (
          <ImageCard
            imageItem={item}
            key={item.id}
            handleOpenModal={handleOpenModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

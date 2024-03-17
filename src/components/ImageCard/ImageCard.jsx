import styles from "./ImageCard.module.css";

const ImageCard = ({ imageItem, handleOpenModal }) => {
  return (
    <li
      className={styles.imageListItem}
      data-id={imageItem.id}
      onClick={() => handleOpenModal(imageItem)}
    >
      <img
        className={styles.image}
        src={imageItem.urls.small}
        alt={imageItem.description}
      />
    </li>
  );
};

export default ImageCard;

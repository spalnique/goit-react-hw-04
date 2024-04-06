import style from '../ImageCard/ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div
      className={style.cardWrapper}
      >
      <img
        className={style.cardImage}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => {
        onClick(image);
      }}
      />
    </div>
  );
};

export default ImageCard;

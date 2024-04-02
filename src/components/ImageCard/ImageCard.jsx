import style from '../ImageCard/ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div
      className={style.cardWrapper}
      onClick={() => {
        onClick(image);
      }}>
      <img
        className={style.cardImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;

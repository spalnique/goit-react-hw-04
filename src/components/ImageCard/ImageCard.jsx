import { forwardRef } from 'react';
import style from '../ImageCard/ImageCard.module.css';

export const ImageCard = forwardRef(function ImageCard(
  { image, onClick },
  ref
) {
  return (
    <div
      ref={ref}
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
});

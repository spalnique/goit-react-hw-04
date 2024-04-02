import { useEffect, useRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import style from '../ImageGallery/ImageGallery.module.css';
import { perPage } from '../../unsplash-api/unsplash-api';

const ImageGallery = ({ images, openModal }) => {
  const galleryItemRef = useRef();
  const galleryRef = useRef();

  useEffect(() => {
    const imageHeight = galleryItemRef.current.getBoundingClientRect().height;
    const rowGap = parseInt(window.getComputedStyle(galleryRef.current).rowGap);

    if (images.length > perPage) {
      window.scrollBy({
        top: imageHeight * 3 + rowGap - 77,
        behavior: 'smooth',
      });
    }
  });

  return (
    <ul
      ref={galleryRef}
      className={style.galleryList}
      onContextMenu={(e) => e.preventDefault()}>
      {images.map((image) => (
        <li ref={galleryItemRef} key={image.id} className={style.galleryItem}>
          <ImageCard image={image} onClick={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

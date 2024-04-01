import { useEffect, useRef } from 'react';
import { ImageCard } from '../ImageCard/ImageCard';
import style from '../ImageGallery/ImageGallery.module.css';
import { perPage } from '../../unsplash-api/unsplash-api';

export const ImageGallery = ({ images, openModal }) => {
  const galleryItemRef = useRef();
  const galleryRef = useRef();
  useEffect(() => {
    const imageHeight = galleryItemRef.current.getBoundingClientRect().height;
    const rowGap = parseInt(window.getComputedStyle(galleryRef.current).rowGap);
    if (images.length > perPage) {
      window.scrollBy({
        top: imageHeight * 3 + rowGap - 85,
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
        <li key={image.id} className={style.galleryItem}>
          <ImageCard ref={galleryItemRef} image={image} onClick={openModal} />
        </li>
      ))}
    </ul>
  );
};

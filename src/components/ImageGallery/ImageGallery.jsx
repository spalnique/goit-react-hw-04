import style from '../ImageGallery/ImageGallery.module.css';
import { useEffect, useRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { perPage } from '../../unsplash-api/unsplash-api';

const ImageGallery = ({ images, openModal, getHeaderHeight }) => {
  const galleryRef = useRef();

  useEffect(() => {
    if (images.length > perPage) {
      const galleryRowGap = parseInt(
        window.getComputedStyle(galleryRef.current).rowGap
      );
      const headerHeight = getHeaderHeight();
      const galleryElemArr = galleryRef.current.children;
      const targetIndex = galleryElemArr.length - perPage;
      const scrollValue =
        galleryElemArr[targetIndex].offsetTop - (headerHeight + galleryRowGap);

      window.scrollTo({
        top: scrollValue,
        behavior: 'smooth',
      });
    }
  }, [images, getHeaderHeight]);

  return (
    <ul
      ref={galleryRef}
      className={style.galleryList}
      onContextMenu={(e) => e.preventDefault()}>
      {images.map((image) => (
        <li key={image.id} className={style.galleryItem}>
          <ImageCard image={image} onClick={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
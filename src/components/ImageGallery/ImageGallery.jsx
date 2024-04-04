import style from '../ImageGallery/ImageGallery.module.css';
import { useEffect, useRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { perPage } from '../../unsplash-api/unsplash-api';

const ImageGallery = ({ images, openModal }) => {
  const galleryRef = useRef();

  useEffect(() => {
    const headerElem = galleryRef.current.previousSibling;
    const headerHeight = headerElem.getBoundingClientRect().height;
    const rowGap = parseInt(window.getComputedStyle(galleryRef.current).rowGap);

    if (images.length > perPage) {
      const galleryElemArr = galleryRef.current.children;
      const targetIndex = galleryElemArr.length - perPage;
      const scrollValue =
        galleryElemArr[targetIndex].offsetTop - headerHeight - rowGap;

      window.scrollTo({
        top: scrollValue,
        behavior: 'smooth',
      });
    }
  }, [images]);

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

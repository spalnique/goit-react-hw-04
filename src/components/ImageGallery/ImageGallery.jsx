import { ImageCard } from '../ImageCard/ImageCard';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

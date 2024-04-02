import { useState, useEffect } from 'react';
import { getPhotos } from '../../unsplash-api/unsplash-api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import useModal from '../../hooks/useModal';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { modal, open, close } = useModal({ visible: false, image: null });

  const onSubmit = (userInput) => {
    if (userInput === request) return;
    setError(false);
    setResponse(null);
    setPhotos([]);
    setPage(1);
    setRequest(userInput);
  };

  const handleLoadmore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!request) return;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getPhotos(request, page);
        setResponse(response);
        if (response.total) setPhotos((prev) => [...prev, ...response.results]);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [request, page]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {photos.length ? (
        <ImageGallery images={photos} openModal={open} />
      ) : (
        response && !photos.length && <p>Oops! Nothing found...</p>
      )}
      {error && <ErrorMessage />}
      {loading ? (
        <Loader />
      ) : (
        response &&
        page < response.total_pages && <LoadMoreBtn onClick={handleLoadmore} />
      )}
      <ImageModal
        isOpen={modal.visible}
        image={modal.image}
        closeModal={close}
      />
    </>
  );
};

export default App;

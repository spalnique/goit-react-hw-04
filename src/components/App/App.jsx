import { useState, useEffect } from 'react';
import { getPhotos } from '../../unsplash-api/unsplash-api';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { Loader } from '../Loader/Loader';
import { useModal } from '../../hooks/useModal';
import { ImageModal } from '../ImageModal/ImageModal';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { modal, open, close } = useModal({ visible: false, image: null });

  const onSubmit = (userInput) => {
    if (userInput === request) return;
    setResponse(null);
    setPhotos([]);
    setPage(1);
    setRequest(userInput);
  };

  const handleLoadmore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!request || !page) return;
    try {
      setLoading(true);
      const fetchPhotos = async () => {
        const response = await getPhotos(request, page);
        setResponse(response);
        response.total > 0 &&
          setPhotos((prev) => [...prev, ...response.results]);
      };

      fetchPhotos();
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [request, page]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {response && photos.length ? (
        <ImageGallery images={photos} openModal={open} />
      ) : response && !photos.length ? (
        <p>Oops! Nothing found...</p>
      ) : null}

      {error && <ErrorMessage />}

      {response && page < response.total_pages && (
        <LoadMoreBtn onClick={handleLoadmore} />
      )}

      {loading && <Loader />}

      <ImageModal
        isOpen={modal.visible}
        image={modal.image}
        closeModal={close}
      />
    </>
  );
};

export default App;

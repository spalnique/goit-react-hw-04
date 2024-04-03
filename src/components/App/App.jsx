import { useState, useEffect } from 'react';
import { getPhotos } from '../../unsplash-api/unsplash-api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import useModal from '../../hooks/useModal';
import usePage from '../../hooks/usePage';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [request, setRequest] = useState('');
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  // const [response, setResponse] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pages, setPage, setTotal } = usePage({ current: 1, total: 0 });
  const { modal, open, close } = useModal({ visible: false, image: null });

  const onSubmit = (userInput) => {
    if (userInput === request) return;
    setError(false);
    // setResponse(null);
    setPhotos(null);
    setPage(1);
    setRequest(userInput);
  };

  const handleLoadmore = () => {
    setPage(pages.current + 1);
  };

  useEffect(() => {
    if (!request) return;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getPhotos(request, pages.current);
        // setResponse(response);
        setTotal(response.total_pages);
        setPhotos((prev) =>
          prev ? [...prev, ...response.results] : [...response.results]
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [request, pages.current]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {error && <ErrorMessage />}

      {Array.isArray(photos) &&
        (photos.length ? (
          <ImageGallery images={photos} openModal={open} />
        ) : (
          <p>Oops! Nothing found...</p>
        ))}

      {loading ? (
        <Loader />
      ) : (
        pages.current < pages.total && <LoadMoreBtn onClick={handleLoadmore} />
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

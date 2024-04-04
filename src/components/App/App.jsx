import { useState, useEffect } from 'react';
import { getPhotos } from '../../unsplash-api/unsplash-api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import useModal from '../../hooks/useModal';
import usePages from '../../hooks/usePages';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  // const [response, setResponse] = useState(null);
  // const [page, setPage] = useState(1);
  const [request, setRequest] = useState('');
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const { page, totalPages, resetPage, nextPage, resetTotal, setTotal } =
    usePages();
  const { modal, open, close } = useModal({ visible: false, image: null });

  const onSubmit = (userInput) => {
    if (userInput === request) return;
    // setResponse(null);
    setError(false);
    setPhotos(null);
    resetTotal();
    resetPage();
    setRequest(userInput);
  };

  useEffect(() => {
    if (!request) return;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getPhotos(request, page);
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
  }, [request, page, setTotal]);

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
        page < totalPages && <LoadMoreBtn onClick={nextPage} />
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
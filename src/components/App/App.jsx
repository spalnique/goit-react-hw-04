import { useState, useEffect } from 'react';
import { getPhotos } from '../../unsplash-api/unsplash-api';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { Loader } from '../Loader/Loader';

const App = () => {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = (userInput) => {
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
    } finally {
      setLoading(false);
    }
  }, [request, page]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {response && page < response.total_pages && (
        <LoadMoreBtn onClick={handleLoadmore} />
      )}
      {console.log(response, photos.length)}
      {response && photos.length ? (
        <ImageGallery images={photos} />
      ) : response && !photos.length ? (
        <p>Oops! Nothing found...</p>
      ) : null}
      {loading && <Loader />}
    </>
  );
};

export default App;

import toast, { Toaster } from 'react-hot-toast';
import style from '../SearchBar/SearchBar.module.css';
import { forwardRef } from 'react';

const SearchBar = forwardRef(function SearchBar({ onSubmit }, ref) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim();
    if (!inputValue) {
      toast.error('Search request cannot be empty');
      e.target.reset();
      return;
    }
    onSubmit(inputValue);
    e.target.reset();
  };

  return (
    <>
      <header ref={ref} className={style.searchHeader}>
        <form className={style.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={style.searchInput}
          />
          <button type="submit" className={style.searchButton}>
            Search
          </button>
        </form>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#fff', color: '#1f1fc4' },
          }}
        />
      </header>
    </>
  );
});

export default SearchBar;

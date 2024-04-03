import toast, { Toaster } from 'react-hot-toast';
import style from '../SearchBar/SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
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
      <header className={style.searchHeader}>
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
      {/* <div className={style.triggerContainer}></div>
      <div className={style.reminderContainer}><span>search</span></div> */}
    </>
  );
};

export default SearchBar;

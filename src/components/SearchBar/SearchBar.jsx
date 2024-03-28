import toast, { Toaster } from 'react-hot-toast';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    console.log(inputValue);
    if (!inputValue) {
      toast.error('This is an error!');
      return;
    }
    onSubmit(inputValue);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#fff', color: '#1f1fc4' },
        }}
      />
    </header>
  );
};

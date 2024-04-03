import { useState } from 'react';

const usePage = (initialPages = { current: 1, total: 0 }) => {
  const [pages, setPages] = useState(initialPages);
  const setPage = (value) => setPages(() => ({ ...pages, current: value }));
  const setTotalPages = (value) => setPages(() => ({ ...pages, total: value }));
  return { pages, setPage, setTotalPages };
};

export default usePage;

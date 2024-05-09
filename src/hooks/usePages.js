import { useCallback, useState } from 'react';

const usePages = ({ initPage, initTotal } = { initPage: 1, initTotal: 0 }) => {
  const [page, setPage] = useState(initPage);
  const [totalPages, setTotalPages] = useState(initTotal);

  const resetPage = () => setPage(1);
  const nextPage = () => setPage((page) => page + 1);

  const resetTotal = () => setTotalPages(0);
  const setTotal = useCallback((value) => setTotalPages(value), []);

  return { page, totalPages, resetPage, nextPage, resetTotal, setTotal };
};

export default usePages;

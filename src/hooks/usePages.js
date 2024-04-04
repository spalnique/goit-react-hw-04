import { useCallback, useState } from 'react';

const usePages = ({ initPage, initTotal } = { initPage: 1, initTotal: 0 }) => {
  const [page, setPage] = useState(initPage);
  const [totalPages, setTotalPages] = useState(initTotal);

  const resetPage = useCallback(() => setPage(1), []);
  const nextPage = useCallback(() => setPage((page) => page + 1), []);

  const resetTotal = useCallback(() => setTotalPages(0), []);
  const setTotal = useCallback((value) => setTotalPages(value), []);
  
  return { page, totalPages, resetPage, nextPage, resetTotal, setTotal };
};

export default usePages;

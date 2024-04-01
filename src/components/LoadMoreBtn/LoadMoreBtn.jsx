import style from '../LoadMoreBtn/LoadMoreBtn.module.css';
// import { forwardRef } from 'react';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button
      className={style.loadmoreButton}
      onClick={() => {
        onClick();
        // const tID = setTimeout(() => {
        //   window.scrollBy({ top: 680, behavior: 'smooth' });
        //   clearTimeout(tID);
        // }, 1000);
      }}>
      Loadmore
    </button>
  );
};

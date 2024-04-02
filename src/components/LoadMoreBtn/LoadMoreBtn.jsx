import style from '../LoadMoreBtn/LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button
      className={style.loadmoreButton}
      onClick={() => {
        onClick();
      }}>
      Loadmore
    </button>
  );
};

export default LoadMoreBtn;

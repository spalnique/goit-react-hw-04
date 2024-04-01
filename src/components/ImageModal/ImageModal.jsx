import ReactModal from 'react-modal';
import style from '../ImageModal/ImageModal.module.css';

export const ImageModal = ({ isOpen, image, closeModal }) => {
  ReactModal.setAppElement('#root');
  isOpen
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'scroll');
  return (
    isOpen && (
      <ReactModal
        isOpen={true}
        onRequestClose={closeModal}
        overlayClassName={style.modalOverlay}
        className={style.modalContainer}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        preventScroll={true}>
        {
          <div className={style.imageWrapper}>
            <img
              className={style.modalImage}
              src={image.urls.regular}
              alt={image.alt_description}
              onClick={closeModal}
              onContextMenu={closeModal}
            />
            <span className={style.modalClose} onClick={closeModal}>
              x
            </span>
          </div>
        }
      </ReactModal>
    )
  );
};
